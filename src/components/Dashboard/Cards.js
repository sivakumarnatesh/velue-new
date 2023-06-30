import React from "react";
// import ProfileIcon from "../../images/Vector.svg";
// import CarbonOrder from "../../images/carbon.svg";
// import GroupIcon from "../../images/Group.svg";
import { Images } from "../../assets/Images/Images";
import "./Dashboard.scss";

const Cards = () => {
  const cardData = [
    {
      icon: `${Images.Customers}`,
      title: "Customers",
      amount: "50000",
      overAll: "+150 this week",
    },
    {
      icon: `${Images.TotalOrders}`,
      title: "Total Orders",
      amount: "14,225",
      overAll: "+125 this week",
    },
    {
      icon: `${Images.PendingOrders}`,
      title: "Pending Orders",
      amount: "250",
      overAll: "-",
    },
    {
      icon: `${Images.PendingOrders}`,
      title: "Sales (Rs.)",
      amount: "14,52,000",
      overAll: "+50% this week",
    },
    {
        icon: `${Images.PendingOrders}`,
        title: "Pending Amt (Rs.)",
        amount: "16,000",
        overAll: "",
      },
  ];

  return (
    <div className="card-container">
      {cardData.length > 0 && cardData?.map((item) => {
        return (
          <div className="card-box">
            <div className="card-box-details">
              <div className="card-img">
                <img src={item?.icon} alt="Logo" />
              </div>
              <div className="card-content">
                <div className="card-title">
                  {item?.title}
                </div>
                <div className="card-amount">
                  {item?.amount}
                </div>
              </div>
            </div>
            <div className="card-description">
              {item?.overAll}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
