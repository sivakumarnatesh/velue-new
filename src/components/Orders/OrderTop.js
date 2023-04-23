import React from "react";
import Title from "../../sharedComponents/Title/Title";
import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ORDER_STATUS } from "../../utils/Variables/DefaultData";

const OrderTop = () => {
  const { Option } = Select;
  return (
    <div className="OrdersTop">
      <div>
        <Title title="All Orders" className="AllOrders" />
        <Title title="Orders Received" className="OrdersReceived" />
      </div>
      <div className="SearchBar">
        <Input
          size="small"
          placeholder="Search Customer Name"
          prefix={<SearchOutlined />}
        />
      </div>
      <div className="StatusDropdown">
        <Select style={{ width: 200 }}   placeholder="Search to Select">
          {ORDER_STATUS.length > 0 && ORDER_STATUS?.map((item) => {
            return <Option className="Options" value={item}>{item}</Option>
          })}
         
        </Select>
      </div>
    </div>
  );
};

export default OrderTop;
