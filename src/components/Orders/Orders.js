import React from "react";
import "./Orders.scss";
import OrderTop from "./OrderTop";
import OrderTable from "./OrderTable";
import './Orders.scss';

function Orders() {
  return (
    <div className="OrdersContainer">
      <OrderTop />
      <OrderTable />
    </div>
  );
}

export default Orders;
