import React from "react";
import Title from "../../sharedComponents/Title/Title";
import { Images } from "../../assets/Images/Images";

const Inventory = () => {
  return (
    <div className="InventoryContainer">
      <div className="InventoryTop">
        <Title title="Low Stock Goods (30)" className="LowStock" />
        <Title title="Current/minimum" className="Minimum" />
      </div>
      <div className="InventoryCards">
        <div className="CardLHS">
          <div>
            <img src={Images.OrderedProduct} alt="InventoryProduct" />
          </div>
          <div className="ProductDetails">
            <Title title="Neo Slim Washing" className="ProductFirstName" />
            <Title title="Machine Top" className="ProductFirstName" />
          </div>
        </div>
        <div>
          <Title title="25Pcs/50Pcs" className="Pcs" />
        </div>
      </div>
    </div>
  );
};

export default Inventory;
