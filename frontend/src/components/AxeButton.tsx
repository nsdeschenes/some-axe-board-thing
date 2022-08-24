import { Button } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const AxeButton: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Button
      backgroundColor="burlywood"
      textColor="darkred"
      _hover={{ backgroundColor: "darkred", textColor: "burlywood" }}
    >
      {children}
    </Button>
  );
};

export default AxeButton;
