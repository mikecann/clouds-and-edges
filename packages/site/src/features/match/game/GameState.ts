import {
  CellState,
  computeCellStates,
  Line,
  MatchProjection,
  MatchSettings,
  Player,
} from "@project/shared";

export interface GameState {
  cells: CellState[];
  lines: Line[];
  players: Player[];
  settings: MatchSettings;
}

export const constructGameState = (match: MatchProjection): GameState => {
  if (!match.joinedByUserId) throw new Error(`Must be joined`);
  return {
    lines: match.lines,
    cells: computeCellStates({ lines: match.lines, settings: match.settings }),
    settings: match.settings,
    players: [
      {
        id: match.createdByUserId,
        name: "player1",
        color: "red",
        avatar: ":)",
      },
      {
        id: match.joinedByUserId,
        name: "player2",
        color: "blue",
        avatar: ":(",
      },
    ],
  };
};
