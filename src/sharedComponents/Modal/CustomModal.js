import { CloseOutlined, MinusOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";
import './CustomModal.scss';

function CustomModal({
  children,
  visible,
  onCancel,
  className,
  minimize,
  showClose,
  showMinimize,
  closeOnPress,
}) {
  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={onCancel}
      className={className}
    >
      <div className="modalGlobalComponentContainer">
        <div className="modalTopContainer">
          {showMinimize && (
            <button type="button" onClick={minimize}>
              <MinusOutlined className="icon" />
            </button>
          )}
          {showClose && (
            <button type="button" onClick={closeOnPress}>
              <CloseOutlined className="icon" />
            </button>
          )}
        </div>
        {children}
      </div>
    </Modal>
  );
}

export default CustomModal;
