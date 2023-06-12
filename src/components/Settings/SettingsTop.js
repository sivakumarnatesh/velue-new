import React from "react";
import Title from "../../sharedComponents/Title/Title";
import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
// import { ORDER_STATUS } from "../../utils/Variables/DefaultData";
import CustomButton from "../../sharedComponents/Buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import { AdminScreens } from "../../utils/Routing/RoutePath";

const SettingsTop = ({ newrole,editMode }) => {
  const navigate = useNavigate();

  const AddNewRole = () => {
    navigate(AdminScreens.addrole);
  };

  return (
    <div className="OrdersTop">
      <div>
        <Title title={editMode?"Edit Roles":"Roles"} className="AllOrders" />
        <Title title="All Roles" className="OrdersReceived" />
      </div>
      {newrole ? (
        <div className="Buttons">
          <CustomButton
            text="Cancel"
            className="Reject"
            // onClick={() => onCancel()}
          />
          <CustomButton
            text="Save"
            className="Approve"
            // onClick={validateCredentials}
          />
        </div>
      ) : (
        <>
          <div className="SearchBar">
            <Input
              size="small"
              placeholder="Search Products"
              prefix={<SearchOutlined />}
            />
          </div>
          <div className="StatusDropdown">
            <CustomButton
              className="AddUSer"
              onClick={AddNewRole}
              text="+ Add Role"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SettingsTop;
