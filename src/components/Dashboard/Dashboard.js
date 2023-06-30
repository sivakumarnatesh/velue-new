import React from "react";
import "./Dashboard.scss";
import Title from "../../sharedComponents/Title/Title";
import Cards from "./Cards";
import CommonCard from "./CommonCard";
import { Area } from "@ant-design/plots";
import { GraphData } from "./GraphData";
import Carousel from "./Carousel";
import Inventory from "./Inventory";

function Dashboard() {
  const config = {
    data: GraphData,
    xField: "Date",
    yField: "scales",
    xAxis: {
      tickCount: 15,
    },
    animation: false,
    // slider: {
    //   start: 0.1,
    //   end: 0.9,
    //   trendCfg: {
    //     isArea: true,
    //   },
    // },
  };
  return (
    <div className="DashboardContainer">
      <Title title="Dashboard" className="Title" />
      <Cards />
      <CommonCard Children={<Area {...config} />} />
      <div className="DashboardLastContainer">
      <CommonCard Children={<Carousel />} />
      <CommonCard Children={<Inventory />} />
      </div>
    </div>
  );
}

export default Dashboard;
