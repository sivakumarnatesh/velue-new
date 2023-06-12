import React from "react";
import "./Orders.scss";
import OrderTop from "./OrderTop";
import OrderTable from "./OrderTable";
import "./Orders.scss";
import { useState } from "react";

const Orders = () => {
  const [val,setVal] = useState('');
  const searchOrder = (val) => {
    setVal(val);
  }
  return (
    <div className="OrdersContainer">
      <OrderTop status={true} searchOrder={searchOrder} />
      <OrderTable val={val} />
    </div>
  );
};

export default Orders;
