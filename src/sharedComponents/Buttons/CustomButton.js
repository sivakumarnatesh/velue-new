import { Button } from "antd";
import React from "react";
import "./CustomButton.scss";

const CustomButton = ({ text, className, onClick, Ref,icon }) => {
  return (
    <Button icon={icon} className={className} onClick={onClick} ref={Ref}>
      {text}
    </Button>
  );
};

export default CustomButton;
