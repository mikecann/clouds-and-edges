import { ensure } from "@project/essentials";
import { GameState } from "./game";

export type PlayerId = string;

export interface PlayerState {
  id: PlayerId;
  color: string;
  avatarEmoji: string;
}

export const producePlayerState = (options: { id: string; color?: string }): PlayerState => ({
  color: "red",
  avatarEmoji: ":)",
  ...options,
});

export const getPlayer = (players: PlayerState[], id: string): PlayerState =>
  ensure(players.find((p) => p.id == id));
