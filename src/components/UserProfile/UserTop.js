import { LeftOutlined } from "@ant-design/icons";
import React from "react";
import Title from "../../sharedComponents/Title/Title";
import CustomButton from "../../sharedComponents/Buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import { AdminScreens } from "../../utils/Routing/RoutePath";

const UserTop = ({ validateCredentials, onCancel }) => {
  const navigate = useNavigate();
  return (
    <div className="DetailsTop">
      <div className="TopLeft">
        <div className="BackBtn">
          <LeftOutlined
            onClick={() => {
              navigate(AdminScreens.users);
            }}
          />
        </div>
        <div className="Titles">
          <>
            <Title title="Add User" className="OrderID" />
            {/* <Title title="GST32564578378" className="Itemcode" /> */}
          </>
        </div>
      </div>

      <div className="Buttons">
        <CustomButton text="Cancel" className="Reject" onClick={onCancel} />
        <CustomButton
          text="Add"
          className="Approve"
          onClick={validateCredentials}
        />
      </div>
    </div>
  );
};

export default UserTop;
