import Board from "../components/Board";
import { Flex, Heading } from "@chakra-ui/react";
import { useSubscribeToEvent } from "../utils/pusher";

const Game: React.FC = () => {
  useSubscribeToEvent("pushed-point", () => { console.debug("data-received") })
  return (
    <Flex flexDir="column">
      <Heading>Game</Heading>
      <Board />
    </Flex>
  );
};

export default Game;
