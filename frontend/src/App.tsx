import { Box, Flex } from "@chakra-ui/react";
import { Link, Route, Routes } from "react-router-dom";
import AxeButton from "./components/AxeButton";
import Game from "@/pages/Game";
import Home from "@/pages/Home";

const App: React.FC = () => {
  return (
    <Flex flexDirection="column" alignItems="center" pt="1em">
      <Flex flexDirection="row" justifyContent="space-between" width="25%">
        <Link to="/">
          <AxeButton>Home</AxeButton>
        </Link>
        <Link to="/game">
          <AxeButton>Game</AxeButton>
        </Link>
      </Flex>
      <Box pt="2em">
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="game" element={<Game />} />
          </Route>
        </Routes>
      </Box>
    </Flex>
  );
};

export default App;
