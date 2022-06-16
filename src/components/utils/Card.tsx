import clsx from "clsx";
import { FC, ReactNode } from "react";
import { Box } from "@chakra-ui/react";

interface CardProps {
  children: ReactNode;
  className?: string;
  forceRounded?: boolean;
}

export const Card: FC<CardProps> = ({
  children,
  className = "",
  forceRounded = false,
}) => {
  return (
    <Box
      borderRadius="0.75rem"
      borderWidth="1px"
      bg="white"
      borderColor="gray.300"
    >
      {children}
    </Box>
  );
};

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export const CardHeader: FC<CardHeaderProps> = ({
  children,
  className = "",
}) => {
  return <div className={`border-b p-3 ${className}`}>{children}</div>;
};

interface CardBodyProps {
  children?: ReactNode;
  className?: string;
}
export const CardBody: FC<CardBodyProps> = ({ children, className = "" }) => {
  return <div className={`p-5 ${className}`}>{children}</div>;
};
