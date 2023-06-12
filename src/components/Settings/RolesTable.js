import React from "react";
import AntdTable from "../../sharedComponents/AntdTable/AntdTable";
import PopOver from "../../sharedComponents/PopOver/PopOver";
import { MoreOutlined } from "@ant-design/icons";
import { AdminScreens } from "../../utils/Routing/RoutePath";
import { useNavigate } from "react-router-dom";

function RolesTable() {
  const navigate = useNavigate();

  const editRole = (row) => {
    navigate(AdminScreens.addrole, { state: { editMode: true } });
  };

  const assignContentData = (row) => {
    let result = [];
    if (true) {
      const val = {
        text: "Edit",
        onClick: () => editRole(row),
      };
      result = [...result, val];
    }
    if (true) {
      const val = {
        text: "Delete",
        // onClick: () => deleteMember(row),
      };
      result = [...result, val];
    }
    if (true) {
      const val = {
        text: "Disable",
        // onClick: () => disableMember(row),
      };
      result = [...result, val];
    }

    return result;
  };

  const dataSource = [
    {
      key: 1,
      role: "Managing Director",
      description: "Complete Access",
    },
  ];

  const columns = [
    {
      title: "Role",
      dataIndex: "role",
      //   render: (text) => {
      //     return <div>{text?.charAt(0)?.toUpperCase() + text?.slice(1)}</div>;
      //   },
    },
    {
      title: "Description",
      dataIndex: "description",
      //   render: (text) => {
      //     return <div>{text?.charAt(0)?.toUpperCase() + text?.slice(1)}</div>;
      //   },
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      render: (row) => {
        const contentData = assignContentData(row);
        return (
          <PopOver
            getPopupContainer={(triggerNode) => triggerNode}
            content={contentData}
            children={<MoreOutlined className="dotIcon" />}
          />
        );
      },
    },
  ];

  return (
    <AntdTable
      className="userTable"
      dataSource={dataSource}
      columns={columns}
      scroll={{ x: true }}
      limit={6}
    />
  );
}

export default RolesTable;
