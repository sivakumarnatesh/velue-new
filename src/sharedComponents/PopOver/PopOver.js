import React, { useState } from "react";
import { Popover } from "antd";
import CustomButton from "../Buttons/CustomButton";

function PopOver({ content, children }) {
  const [click, setClick] = useState(false);
  const handleHoverChange = (open) => {
    setClick(open);
  };

  return (
    <Popover
      className="popOverClass"
      trigger="hover"
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      content={
        <div style={{ display: "flex", flexDirection: "column" }}>
          {content.map((item) => (
            <CustomButton
              text={item.text}
              className='PopOver'
              onClick={() => {
                setClick(false);
                item.onClick();
              }}
            />
          ))}
        </div>
      }
      placement="left"
      open={click}
      onOpenChange={handleHoverChange}
    >
      {children}
    </Popover>
  );
}

export default PopOver;
