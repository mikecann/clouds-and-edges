import * as React from "react";
import { Badge, Button, Text, VStack, Box, Avatar, HStack, Tooltip } from "@chakra-ui/react";
import { MatchProjection, MatchSettings, MatchStatus, Player } from "@project/shared";
import { matchLiteral } from "variant";

interface Props {
  match: MatchProjection;
  meId: string;
  actions?: React.ReactNode;
}

export const MatchCard: React.FC<Props> = ({ match, meId, actions }) => {
  return (
    <VStack backgroundColor={"gray.900"} borderRadius={6} padding={5}>
      <HStack spacing={-5}>
        {match.players.map((p) => (
          <Tooltip label={p.name}>
            <Avatar
              icon={<Box>{p.avatar}</Box>}
              border={`2px solid rgba(255,255,255,0.5)`}
            ></Avatar>
          </Tooltip>
        ))}
      </HStack>
      <Text as={"h4"}>
        {match.settings.gridSize.width}x{match.settings.gridSize.height}
      </Text>
      <Text>
        {matchLiteral(match.status, {
          "not-started": () => <Badge colorScheme="blue">Not Started</Badge>,
          playing: () => {
            const meIsPlayer = match.players.some((p) => p.id == meId);
            if (!meIsPlayer) return <Badge colorScheme="purple">Playing</Badge>;

            const isMyTurn = match.nextPlayerToTakeTurn == meId;
            if (isMyTurn) return <Badge colorScheme="green">Your Turn</Badge>;

            return <Badge colorScheme="yellow">Their Turn</Badge>;
          },
          cancelled: () => <Badge colorScheme="red">Cancelled</Badge>,
          finished: () => <Badge colorScheme="olive">Finished</Badge>,
        })}
      </Text>
      {actions}
    </VStack>
  );
};
