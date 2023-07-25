import React from "react";
import Title from "../../sharedComponents/Title/Title";
import { Input, Select, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ORDER_STATUS, STATUS_CODE } from "../../utils/Variables/DefaultData";
import { useState } from "react";
// import { BASE_URL, SEARCH_ORDER } from "../../utils/API/EndPoint";
// import { GetAPI } from "../../utils/API";
import { useEffect } from "react";
import CustomButton from "../../sharedComponents/Buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import { AdminScreens } from "../../utils/Routing/RoutePath";

const OrderTop = ({ statusOrder, searchOrder, status, search }) => {
  const [OrderId, setOrderId] = useState("");
  const [statusVal, setStatusVal] = useState("");
  const { Option } = Select;

  const navigate = useNavigate();

  useEffect(() => {
    searchOrder(OrderId);
  }, [OrderId]);

  useEffect(() => {
    statusOrder(statusVal);
  }, [statusVal]);

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
        {search && (
          <Input
            allowClear
            size="small"
            placeholder={status ? "Search By Order ID" : "Search Goods"}
            prefix={<SearchOutlined />}
            onChange={(e) => setOrderId(e.target.value)}
          />
        )}
      </div>
      {status && (
        <div className="OrderStatus">
          <div className="StatusDropdown">
            <Select
              style={{ width: 200 }}
              onChange={(val) => setStatusVal(val)}
              placeholder="Search to Select"
            >
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
          <CustomButton
            text="+ Create Order"
            className="createOrder"
            onClick={() => navigate(AdminScreens.orderInsertion)}
          />
        </div>
      )}
    </div>
  );
};

export default OrderTop;
