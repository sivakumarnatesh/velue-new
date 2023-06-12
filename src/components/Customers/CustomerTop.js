import React from "react";
import Title from "../../sharedComponents/Title/Title";
import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
// import { ORDER_STATUS } from "../../utils/Variables/DefaultData";
import CustomButton from "../../sharedComponents/Buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import { AdminScreens } from "../../utils/Routing/RoutePath";

const CustomerTop = ({ newCustomer,validateCredentials,onCancel }) => {
  const navigate = useNavigate();

  const AddNewRole = () => {
    navigate(AdminScreens?.addcustomer);
  };

  return (
    <div className="OrdersTop">
      <div>
        <Title title="Customers" className="AllOrders" />
        <Title title="All Customers" className="OrdersReceived" />
      </div>
      {newCustomer ? (
        <div className="Buttons">
          <CustomButton
            text="Cancel"
            className="Reject"
            onClick={onCancel}
          />
          <CustomButton
            text="Save"
            className="Approve"
            onClick={validateCredentials}
          />
        </div>
      ) : (
        <>
          <div className="SearchBar">
            <Input
              size="small"
              placeholder="Search Customers"
              prefix={<SearchOutlined />}
            />
          </div>
          <div className="StatusDropdown">
            <CustomButton
              className="AddCustomer"
              onClick={AddNewRole}
              text="+ Add customer"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerTop;
