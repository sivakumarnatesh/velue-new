import React from "react";
import Title from "../../sharedComponents/Title/Title";
import { Input, Select, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ORDER_STATUS, STATUS_CODE } from "../../utils/Variables/DefaultData";
import { useState } from "react";
import { BASE_URL, SEARCH_ORDER } from "../../utils/API/EndPoint";
import { GetAPI } from "../../utils/API";
import { useEffect } from "react";

const OrderTop = ({ status, searchOrder }) => {
  const [OrderId, setOrderId] = useState("");
  const { Option } = Select;

  useEffect(() => {
    searchOrder(OrderId);
  }, [OrderId]);

  return (
    <div className="OrdersTop">
      <div>
        <Title
          title={status ? "All Orders" : "Order Details"}
          className="AllOrders"
        />
        <Title
          title={status ? "Orders Received" : "All Order Items"}
          className="OrdersReceived"
        />
      </div>
      <div className="SearchBar">
        <Input
        allowClear
          size="small"
          placeholder={status ? "Search By Order ID" : "Search Goods"}
          prefix={<SearchOutlined />}
          onChange={(e) => setOrderId(e.target.value)}
        />
      </div>
      {status && (
        <div className="StatusDropdown">
          <Select style={{ width: 200 }} placeholder="Search to Select">
            {ORDER_STATUS.length > 0 &&
              ORDER_STATUS?.map((item) => {
                return (
                  <Option className="Options" value={item}>
                    {item}
                  </Option>
                );
              })}
          </Select>
        </div>
      )}
    </div>
  );
};

export default OrderTop;
