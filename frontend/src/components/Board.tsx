import { Box, Flex, ListItem, UnorderedList, Text } from "@chakra-ui/react";
import { useState } from "react";
import AxeButton from "./AxeButton";

const w = 500;
const h = 500;

const pointDistance = ({ x, y }: { x: number; y: number }) =>
  Math.floor(Math.sqrt(Math.pow(x - 250, 2) + Math.pow(y - 250, 2)));

const generatePoints = () => {
  const points = {
    x: Math.floor(Math.random() * 450),
    y: Math.floor(Math.random() * 450),
  };

  return {
    ...points,
    d: pointDistance(points),
  };
};

const Board: React.FC = () => {
  const [points, setPoints] = useState<
    { x: number; y: number; d: number; s: number }[]
  >([]);
  const [score, setScore] = useState(0);

  return (
    <Box>
      <Flex flexDirection="row">
        <Box width="750px" p="1em">
          <svg viewBox="0 0 500 500">
            <rect
              width={500}
              height={500}
              fill="white"
              stroke="black"
              strokeWidth={2}
            />
            {[150, 100, 50].map((point, i) => (
              <circle
                key={`board_${i}`}
                cy={250}
                cx={250}
                r={point}
                stroke="black"
                strokeWidth={2}
                fill="white"
              />
            ))}
            {points.map(({ x, y }, i) => (
              <circle key={`point_${i}`} cy={y} cx={x} r={3} fill="blue" />
            ))}
          </svg>
        </Box>
        <UnorderedList pl="1em">
          {points.map(({ x, y, d, s }, i) => (
            <ListItem key={i}>
              <Text as="kbd">
                x: {x}, y: {y}, distance: {d}, score: {s}
              </Text>
            </ListItem>
          ))}
        </UnorderedList>
      </Flex>
      <Flex>
        <AxeButton
          onClick={() => {
            const { x, y, d } = generatePoints();
            let s = score;

            if (d <= 50) {
              s += 15;
            } else if (d <= 100) {
              s += 10;
            } else if (d <= 150) {
              s += 5;
            }

            setScore(s);

            const point = {
              x,
              y,
              d: pointDistance({ x, y }),
              s,
            };

            setPoints((p) => [...p, point]);
          }}
        >
          Throw Axe
        </AxeButton>
        <AxeButton
          onClick={() => {
            setPoints([]);
            setScore(0);
          }}
          ml="2em"
        >
          Reset
        </AxeButton>
      </Flex>
    </Box>
  );
};

export default Board;
