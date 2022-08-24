import { Button, ButtonProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const AxeButton: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  ...props
}) => {
  return (
    <Button
      backgroundColor="burlywood"
      textColor="darkred"
      _hover={{ backgroundColor: "darkred", textColor: "burlywood" }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AxeButton;
