import { ensure, iife } from "@project/essentials";

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

export const getNextPlayer = (players: Player[], currentPlayer: PlayerId): Player => {
  const index = players.findIndex((p) => p.id == currentPlayer);
  if (index == -1) throw new Error(`player must be part of the given players`);
  const nextIndex = iife(() => {
    if (index + 1 > players.length - 1) return 0;
    return index + 1;
  });
  return players[nextIndex];
};
