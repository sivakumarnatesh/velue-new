import React, { useEffect, useState } from "react";
import "./SideBar.scss";
import { Layout, Menu } from "antd";
import { sideBarTitle } from "../Admin/AdminLayout.config";
import { AdminScreens, BASE_ROUTE } from "../../../utils/Routing/RoutePath";
import {
  FileDoneOutlined,
  HomeOutlined,
  ShopOutlined,
  SmileOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Images } from "../../../assets/Images/Images";
import CustomButton from "../../Buttons/CustomButton";

const SideBar = () => {
  const [SelectedTab, setSelectedTab] = useState(AdminScreens.users);
  const { Sider } = Layout;
  const menuBar = [
    {
      name: sideBarTitle.dashboard,
      id: sideBarTitle.dashboard,
      children: [],
      icon: <HomeOutlined />,
      active: true,
      path: AdminScreens.dashboard,
      isEnabled: true,
    },
    {
      name: sideBarTitle.users,
      id: sideBarTitle.users,
      children: [],
      icon: <SmileOutlined />,
      active: true,
      path: AdminScreens.users,
      isEnabled: true,
    },
    {
      name: sideBarTitle.orders,
      id: sideBarTitle.orders,
      children: [],
      icon: <FileDoneOutlined />,
      active: true,
      path: AdminScreens.orders,
      isEnabled: true,
    },
    {
      name: sideBarTitle.customers,
      id: sideBarTitle.customers,
      children: [],
      icon: <UserOutlined />,
      active: true,
      path: AdminScreens.customers,
      isEnabled: true,
    },
    {
      name: sideBarTitle.product,
      id: sideBarTitle.product,
      children: [],
      icon: <ShopOutlined />,
      active: true,
      path: AdminScreens.product,
      isEnabled: true,
    },
    {
      name: sideBarTitle.report,
      id: sideBarTitle.report,
      children: [],
      icon: <HomeOutlined />,
      active: true,
      path: AdminScreens.report,
      isEnabled: true,
    },
    {
      name: sideBarTitle.settings,
      id: sideBarTitle.settings,
      children: [],
      icon: <SettingOutlined />,
      active: true,
      path: AdminScreens.settings,
      isEnabled: true,
    },
  ];
  const navigate = useNavigate();

  useEffect(() => {
    configureActiveNav();
  }, [window.location, window.location.pathname]);

  const configureActiveNav = () => {
    if (window.location.pathname.includes(BASE_ROUTE.dashboard)) {
      setSelectedTab(BASE_ROUTE.dashboard);
    }
    if (window.location.pathname.includes(BASE_ROUTE.users)) {
      setSelectedTab(BASE_ROUTE.users);
    }
    if (window.location.pathname.includes(BASE_ROUTE.orders)) {
      setSelectedTab(BASE_ROUTE.orders);
    }

    if (window.location.pathname.includes(BASE_ROUTE.product)) {
      setSelectedTab(BASE_ROUTE.product);
    }
    if (window.location.pathname.includes(BASE_ROUTE.report)) {
      setSelectedTab(BASE_ROUTE.report);
    }
  };

  const navigateToPage = (name) => {
    setSelectedTab(name);
    navigate({ pathname: name });
  };

  const Logout = () => {
    navigate({ pathname: '/' });
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      className="SideBar"
    >
      <Menu className="Menus" mode="inline" selectedKeys={SelectedTab}>
        {menuBar.map((item) => {
          return (
            <Menu.Item
              className="Menu-Item"
              key={item?.path}
              onClick={() => navigateToPage(item?.path)}
            >
              <div className="dashboardIcon">{item?.icon}</div>
              <div className="menuTitle">{item?.name}</div>
            </Menu.Item>
          );
        })}
        {/* <Menu.Item>ksjfhgkjsf</Menu.Item> */}
      </Menu>
      <div className="LogoutContainer">
        <div className="UserLogo">
          <img src={Images.UserLogo} alt="Profile_logo" />
        </div>
        <div className="UserDetails">
          <div className="UserName">Barath Choudhary</div>
          <div className="UserRole">Admin</div>
        </div>
      </div>
      <div className="LogoutBtn">
        <CustomButton
          text="Logout"
          className="Logout"
          onClick={() => Logout()}
          icon={<LogoutOutlined />}
        />
      </div>
    </Sider>
  );
};

export default SideBar;
