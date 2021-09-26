import { ensure } from "@project/essentials";

export type PlayerId = string;

export interface Player {
  id: PlayerId;
  name: string;
  color: string;
  avatar: string;
}

export const producePlayerState = (options: { id: string; color?: string }): Player => ({
  color: "red",
  name: "",
  avatar: ":)",
  ...options,
});

export const getPlayer = (players: Player[], id: string): Player =>
  ensure(players.find((p) => p.id == id));
