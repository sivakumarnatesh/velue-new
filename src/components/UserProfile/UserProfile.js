import React, { useEffect, useState } from "react";
import Title from "../../sharedComponents/Title/Title";
import CustomButton from "../../sharedComponents/Buttons/CustomButton";
import "./UserProfile.scss";
import AntdTable from "../../sharedComponents/AntdTable/AntdTable";
import { MoreOutlined,SearchOutlined } from "@ant-design/icons";
import PopOver from "../../sharedComponents/PopOver/PopOver";
import CustomModal from "../../sharedComponents/Modal/CustomModal";
import AddUser from "../Login/Form/AddUser";
import Message from "../../sharedComponents/Message/Message";
import { DELAPI, GetAPI, PUTAPI } from "../../utils/API";
import {
  BASE_URL,
  DELETE_ADMIN_USER,
  DISABLE_ADMIN_USERS,
  LIST_ADMIN_USERS,
} from "../../utils/API/EndPoint";
import { Input, message } from "antd";
import Loader from "../../sharedComponents/CustomLoader/Loader";
import EditUser from "../Login/Form/EditUser";

const UserProfile = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [ConfirmDisable, setConfirmDisable] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Row, setRow] = useState();
  const [Mode, setMode] = useState("add");

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const data = await GetAPI(`${BASE_URL}${LIST_ADMIN_USERS}`);
    setDataSource(data);
  };

  const editMember = (row) => {
    console.log(row);
    setRow(row);
    setEditModal(true);
    setMode("edit");
  };

  const onCancel = () => {
    setOpenModal(false);
    setEditModal(false);
  };

  const disableMember = (row) => {
    console.log(row);
    setRow(row);
    setConfirmDisable(true);
  };

  const deleteMember = (row) => {
    DELAPI(`${BASE_URL}${DELETE_ADMIN_USER}${row?.userId}`)
      .then((res) => {
        console.log("res", res);
        message.success(`Successfully deleted user ${row?.userName}`);
        fetch();
      })
      .catch((err) => {
        console.log("err", err);
        message.error("Something went wrong");
      });
  };

  const AddNewUser = () => {
    setOpenModal(true);
    setMode("add");
  };

  const onDisableCancel = () => {
    setConfirmDisable(false);
  };

  const assignContentData = (row) => {
    let result = [];
    if (true) {
      const val = {
        text: "Edit",
        onClick: () => editMember(row),
      };
      result = [...result, val];
    }
    if (true) {
      const val = {
        text: "Delete",
        onClick: () => deleteMember(row),
      };
      result = [...result, val];
    }
    if (true) {
      const val = {
        text: `${Row?.userStatus === "active" ? "Enable" : "Disable"}`,
        onClick: () => disableMember(row),
      };
      result = [...result, val];
    }

    return result;
  };

  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
    },
    {
      title: "Name",
      dataIndex: "userName",
      render: (text) => {
        return <div>{text?.charAt(0)?.toUpperCase() + text?.slice(1)}</div>;
      },
    },
    {
      title: "Role",
      dataIndex: "userRole",
      render: (text) => {
        return <div>{text?.charAt(0)?.toUpperCase() + text?.slice(1)}</div>;
      },
    },
    {
      title: "Status",
      dataIndex: "userStatus",
      render: (text) => {
        return <div>{text?.charAt(0)?.toUpperCase() + text?.slice(1)}</div>;
      },
    },
    {
      title: "Email",
      dataIndex: "emailId",
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
  const DisableUser = () => {
    console.log("validated");
    const payload = {
      userId: Row?.userId,
      userStatus: Row?.userStatus === "active" ? "inactive" : "active",
    };
    PUTAPI(`${BASE_URL}${DISABLE_ADMIN_USERS}${Row?.userId}`, payload)
      .then((res) => {
        console.log("res", res);
        message.success("User disabled successfully.");
        fetch();
        setConfirmDisable(false);
      })
      .catch((err) => {
        console.log("err", err);
        message.error("Something went wrong");
        setConfirmDisable(false);
      });
  };
  const FindLoader = (flag) => {
    setLoading(flag);
  };
  return (
    <div className="userProfile">
      <div className="UserHeader">
        <Title title="Users" className="Title" />
        <div className="SearchBar">
        <Input
          size="small"
          placeholder="Search Customer Name"
          prefix={<SearchOutlined />}
        />
      </div>
        <CustomButton
          className="AddUSer"
          onClick={AddNewUser}
          text="+ Add User"
        />
      </div>

      {Loading ? (
        <Loader loading={Loading} />
      ) : (
        <AntdTable
          className="userTable"
          dataSource={dataSource}
          columns={columns}
          scroll={{ x: true }}
          limit={6}
        />
      )}

      <CustomModal
        visible={openModal}
        onCancel={onCancel}
        closeOnPress={onCancel}
        className="AddUser"
      >
        {/* <div className="UserDetails">
          <div className="User Title">User ID</div>
          <div className="EmployeeID">1112234</div>
        </div> */}
        <Title title="User Information" className="Title" />
        <AddUser
          onCancel={onCancel}
          FindLoader={FindLoader}
          Row={Row}
          Mode={Mode}
          fetch={fetch}
        />
      </CustomModal>
      <CustomModal
        visible={editModal}
        onCancel={onCancel}
        closeOnPress={onCancel}
        className="AddUser"
      >
        {/* <div className="UserDetails">
          <div className="User Title">User ID</div>
          <div className="EmployeeID">1112234</div>
        </div> */}
        <Title title="User Information" className="Title" />
        <EditUser
          onCancel={onCancel}
          FindLoader={FindLoader}
          Row={Row}
          Mode={Mode}
          fetch={fetch}
        />
      </CustomModal>
      {/* <EditUser onCancel={onCancel} FindLoader={FindLoader} Row={Row} Mode={Mode} fetch={fetch}  /> */}
      <CustomModal
        visible={ConfirmDisable}
        onCancel={onDisableCancel}
        closeOnPress={onDisableCancel}
      >
        <Message
          Header="Disable User"
          subHeader="Are you sure to disable user ?"
          className="DisableUser"
        />
        <div className="addUserBtn">
          <CustomButton
            text="Cancel"
            className="Cancel"
            onClick={onDisableCancel}
          />
          <CustomButton
            text={Row?.userStatus === "active" ? "Disable" : "Enable"}
            className="Save"
            onClick={DisableUser}
          />
        </div>
      </CustomModal>
    </div>
  );
};

export default UserProfile;
