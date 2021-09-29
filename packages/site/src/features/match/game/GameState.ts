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
  const lines = match.turns.map((t) => t.line);
  return {
    lines,
    cells: computeCellStates({ lines, settings: match.settings }),
    settings: match.settings,
    players: match.players,
  };
};
