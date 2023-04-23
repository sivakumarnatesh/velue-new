import React from "react";
import { Layout } from "antd";
import HeaderContainer from "../HeaderContainer/HeaderContainer";
import { AdminContext } from "../../../utils/Services/Context/AdminContext";
import './AdminLayout.scss';
import SideBar from "../SiderBar/SideBar";

const {Content } = Layout;

const AdminLayout = ({children}) => {
  return (
    <AdminContext.Provider value={{}}>
      <Layout className="AdminLayout">
          <HeaderContainer />
        <Layout>
          <SideBar />
          <Content className="ContentLayout">{children}</Content>
        </Layout>
      </Layout>
    </AdminContext.Provider>
  );
};

export default AdminLayout;
