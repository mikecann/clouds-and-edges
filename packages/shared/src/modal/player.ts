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
