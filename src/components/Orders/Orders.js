import React from "react";
import "./Orders.scss";
import OrderTop from "./OrderTop";
import OrderTable from "./OrderTable";
import "./Orders.scss";
import { useState } from "react";

const Orders = () => {
  const [val, setVal] = useState("");
  const [status, setStatus] = useState("");

  const statusOrder = (val) => {
    setStatus(val);
  };
  const searchOrder = (val) => {
    setVal(val);
  };
  return (
    <div className="OrdersContainer">
      <OrderTop
        status={true}
        statusOrder={statusOrder}
        searchOrder={searchOrder}
        search={true}
      />
      <OrderTable val={val} status={status}  />
    </div>
  );
};

export default Orders;
