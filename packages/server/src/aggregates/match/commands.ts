import { AggregateCommandHandlers } from "@project/workers-es";
import { MatchAggregateState } from "./state";
import {
  calculateWinner,
  computeCellStates,
  createMatchSizeToDimensions,
  doesAddingLineFinishACell,
  Line,
  getNextPlayer,
  MatchCommands,
  PlayerId,
} from "@project/shared";
import { MatchEvent } from "./events";
import { ensure, equals, iife } from "@project/essentials";

/**
 * I think this would be better as a state machine using xstate
 */
export const commands: AggregateCommandHandlers<MatchAggregateState, MatchCommands, MatchEvent> = {
  create: ({ state, payload: { size, createdByUserId }, userId, timestamp }) => {
    return {
      kind: `match-created`,
      payload: {
        createdByUserId,
        settings: {
          gridSize: createMatchSizeToDimensions(size),
          maxPlayers: 2, // it is possible for this game to have more than 2 players but to keep it simple we are going to limit it to 2
        },
      },
    };
  },
  "join-request": ({ userId }) => {
    // todo: various checks against state
    return {
      kind: "match-join-requested",
      payload: {
        userId,
      },
    };
  },
  join: ({ state, payload, userId, timestamp }) => {
    const maxPlayers = ensure(state.settings).maxPlayers;
    if (state.players.length >= maxPlayers) throw new Error(`max players reached`);

    const events: MatchEvent[] = [
      {
        kind: `match-joined`,
        payload: {
          player: {
            id: payload.userId,
            avatar: payload.avatar,
            color: payload.color,
            name: payload.name,
          },
        },
      },
    ];

    // If we add this player then we should auto-start the match
    if (state.players.length == maxPlayers - 1)
      events.push({
        kind: "match-started",
        payload: {
          // The person that was last to join is first to start as they shouldnt be AFK
          firstPlayerToTakeATurn: payload.userId,
        },
      });

    return events;
  },
  start: ({ userId, payload }) => {
    // todo: various checks against state
    return {
      kind: "match-started",
      payload: {
        firstPlayerToTakeATurn: payload.firstPlayerToTakeATurn,
      },
    };
  },
  cancel: ({ state, payload: {}, userId, timestamp }) => {
    if (!state.createdAt) throw new Error(`match not created`);
    if (state.cancelledAt) throw new Error(` match already cancelled`);
    if (userId != state.createdByUserId) throw new Error(`you are not the owner`);

    return {
      kind: `match-cancelled`,
      payload: {},
    };
  },
  "take-turn": ({ state, payload, userId, timestamp }) => {
    if (!state.createdAt) throw new Error(`match not created`);
    if (state.cancelledAt) throw new Error(`match cancelled`);
    if (state.winner) throw new Error(`battle already finished`);

    if (state.nextPlayerToTakeTurn != userId) throw new Error(`not your turn`);

    // The player is not allowed to fill in the same line
    const hasLine = (state.lines ?? []).some(
      (l) => equals(l.from, payload.from) && l.direction == payload.direction
    );
    if (hasLine) throw new Error(`line already filled`);

    const newLine: Line = {
      direction: payload.direction,
      from: payload.from,
      owner: userId,
    };

    const linesBefore = state.lines ?? [];
    const linesAfter = [...linesBefore, newLine];
    const settings = ensure(state.settings);

    const nextPlayerToTakeTurn = iife<PlayerId>(() => {
      // If we finish a cell then the person that just took a turn gets to go again
      if (doesAddingLineFinishACell({ newLine, lines: linesBefore, settings })) return userId;

      // Return the alternate player
      return getNextPlayer(state.players, userId).id;
    });

    const events: MatchEvent[] = [
      {
        kind: `match-turn-taken`,
        payload: {
          line: newLine,
          nextPlayerToTakeTurn,
        },
      },
    ];

    // If the match now has a winner then we also should emit the finished event
    const winner = calculateWinner(
      computeCellStates({ settings: ensure(state.settings), lines: linesAfter })
    );

    if (winner)
      events.push({
        kind: "match-finished",
        payload: {
          winner,
        },
      });

    return events;
  },
};
