import React from "react";
import Title from "../../sharedComponents/Title/Title";
import { Checkbox } from "antd";
import { useState } from "react";

const Permission = ({ text }) => {
  const [Access, setAccess] = useState({
    full: true,
    create: false,
    edit: false,
    disable: false,
  });
  return (
    <div className="Permission">
      <div className="PermissionTitle">
        <div className="MainTitle">
          <Title title={text} className="MainUser" />
        </div>
        <div className="Access">
          <Title title="Full Access" className="User" />
          <Title title="Create" className="User" />
          <Title title="Edit" className="User" />
          <Title title="Disable" className="User" />
        </div>
      </div>
      <div className="Checkboxes">
        <div className="MainTitle">
          {/* <Title title="User" className="User" /> */}
        </div>
        <div className="Access">
          <Checkbox checked={Access?.full} />
          <Checkbox checked={Access?.create} />
          <Checkbox checked={Access?.edit} />
          <Checkbox checked={Access?.disable} />
        </div>
      </div>
    </div>
  );
};

export default Permission;
