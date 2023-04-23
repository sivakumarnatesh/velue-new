import React from "react";
import "./HeaderContainer.scss";
import { Layout } from "antd";
import { Images } from "../../../assets/Images/Images";

const HeaderContainer = () => {
  const { Header } = Layout;
  return (
    <Header className="HeaderContainer">
      <div className="color1"></div>
      <div className="color2"></div>
      <div className="color3"></div>
      <img src={Images.HeaderLogo} className="HeaderLogo" alt="HEADER_LOGO" />
    </Header>
  );
};

export default HeaderContainer;
