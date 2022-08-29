import Board from "../components/Board";
import { Flex, Heading } from "@chakra-ui/react";

const Game: React.FC = () => {
  return (
    <Flex flexDir="column">
      <Heading>Game</Heading>
      <Board />
    </Flex>
  );
};

export default Game;
