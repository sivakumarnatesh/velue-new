import React from "react";
import "./Settings.scss";
import SettingsTop from "./SettingsTop";
import TextArea from "antd/es/input/TextArea";
import Title from "../../sharedComponents/Title/Title";
import { Input } from "antd";
import Permission from "./Permission";
import { useLocation } from "react-router-dom";

const AddRole = () => {
    const location = useLocation(); 
    const {state} = location;
    // console.log('props',state?.editMode)
  return (
    <div className="NewRole">
      <SettingsTop newrole={true} editMode={state?.editMode} />
      <div className="RoleForm">
        <Title title="Role Name" className="RoleName" />
        <Input />
        <Title title="Description" className="RoleName" />
        <TextArea placeholder="Maximum 500 words" />
      </div>
      <Permission text='User' />
      <Permission text='Orders' />
      <Permission text='Products' />
      <Permission text='Customers' />
      <Permission text='Report' />
      <div style={{marginBottom:"40px", color:"white"}}>hello</div>
    </div>
  );
};

export default AddRole;
