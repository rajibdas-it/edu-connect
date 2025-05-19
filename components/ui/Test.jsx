"use client";
import { toast } from "sonner";
import { Button } from "./button";

const Test = () => {
  const handleClick = (mode) => {
    mode ? toast.success("Test Success") : toast.error("Test Error");
  };
  return (
    <Button variant="outline" onClick={() => handleClick(true)}>
      Test Toast
    </Button>
  );
};

export default Test;
