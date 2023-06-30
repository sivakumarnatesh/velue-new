import React from "react";
import CustomerTop from "./CustomerTop";
import CustomerTable from "./CustomerTable";
import "./Customer.scss";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function Customers() {
const location = useLocation();
console.log('loc',location?.state)
  return (
    <div className="CustomerContainer">
      <CustomerTop />
      <CustomerTable fetch={location?.state?.fetch} />
    </div>
  );
}

export default Customers;
