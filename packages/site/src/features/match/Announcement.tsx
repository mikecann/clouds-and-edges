import * as React from "react";
import { Box, Text } from "@chakra-ui/react";
import { MatchProjection, PlayerId } from "@project/shared";
import { iife } from "@project/essentials";

interface Props {
  match: MatchProjection;
  meId: PlayerId;
}

export const Announcement: React.FC<Props> = ({ match, meId }) => {
  const isMyTurn = match.nextPlayerToTakeTurn == meId;

  const text = iife(() => {
    if (match.winner) {
      const isMe = match.winner == meId;
      if (isMe)
        return (
          <Text fontWeight={"bold"} fontSize={"4xl"} color={`green`}>
            YOU WON!
          </Text>
        );
      return (
        <Text fontWeight={"bold"} fontSize={"4xl"} color={`red`}>
          YOU LOST!
        </Text>
      );
    }
    return (
      <Text fontWeight={"bold"} fontSize={"4xl"}>
        {" "}
        {isMyTurn ? `Your Turn` : `Their Turn`}
      </Text>
    );
  });

  return <Box>{text}</Box>;
};
