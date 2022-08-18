import { border, Box, Button, Flex, Heading } from "@chakra-ui/react";
import * as d3 from "d3";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

function App() {
  const [points, setPoints] = useState([150, 100, 50]);
  const boardRef = useRef<HTMLDivElement>(null);

  const w = 500;
  const h = 500;
  let i;

  let board = false;

  let plot;

  useLayoutEffect(() => {
    plot = d3
      .select(boardRef.current)
      .append("svg")
      .attr("width", w)
      .attr("height", h);
    const circle = plot.selectAll("circle").data(points);
    const circleEnter = circle.enter().append("circle");

    circleEnter.attr("cy", w / 2);
    circleEnter.attr("cx", h / 2);
    circleEnter.attr("r", (d) => d);
    circleEnter.style("stroke", "black");
    circleEnter.style("stroke-array", "5,5");
    circleEnter.style("stroke-width", "2");
    circleEnter.style("fill", "white");

    return () => {
      d3.select(boardRef.current).remove();
    }
  });

  useEffect(() => {
    var circle = plot.selectAll("circle").data(points);
    var circleEnter = circle.enter().append("circle");

    circleEnter.attr("cy", w / 2);
    circleEnter.attr("cx", h / 2);
    circleEnter.attr("r", (d) => d);
    circleEnter.style("stroke", "black");
    circleEnter.style("stroke-array", "5,5");
    circleEnter.style("stroke-width", "2");
    circleEnter.style("fill", "white");

    return () => {
      d3.select(boardRef.current).remove();
    };
  }, [points]);

  return (
    <Flex bg="grey" alignItems="center" h="100vh" flexDirection="column">
      <Heading>Hello</Heading>
      <Button
        onClick={() => {
          setPoints((p) => [...p, 25]);
        }}
      >
        Add Circle
      </Button>
      <Box>
        <div ref={boardRef} />
      </Box>
    </Flex>
  );
}

export default App;
