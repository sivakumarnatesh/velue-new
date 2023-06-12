import React, { useEffect, useState } from "react";
import Title from "../../sharedComponents/Title/Title";
import CustomButton from "../../sharedComponents/Buttons/CustomButton";
import "./UserProfile.scss";
import AntdTable from "../../sharedComponents/AntdTable/AntdTable";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import PopOver from "../../sharedComponents/PopOver/PopOver";
import CustomModal from "../../sharedComponents/Modal/CustomModal";
import AddUser from "../Login/Form/AddUser";
import Message from "../../sharedComponents/Message/Message";
import { DELAPI, GetAPI, PUTAPI } from "../../utils/API";
import {
  BASE_URL,
  DELETE_ADMIN_USER,
  DISABLE_ADMIN_USERS,
  GET_ROLES,
  LIST_ADMIN_USERS,
  USER_DETAILS,
} from "../../utils/API/EndPoint";
import { Input, message } from "antd";
import Loader from "../../sharedComponents/CustomLoader/Loader";
import EditUser from "../Login/Form/EditUser";
import { STATUS_CODE } from "../../utils/Variables/DefaultData";
import { AdminScreens } from "../../utils/Routing/RoutePath";
import { useLocation, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [ConfirmDisable, setConfirmDisable] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const [Loading, setLoading] = useState(false);
  const [Row, setRow] = useState();
  const [Mode, setMode] = useState("add");
  // const [userDetails, setUserDetails] = useState("");

  const navigate = useNavigate();
  const { location } = useLocation();
  console.log("loc", location);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const data = await GetAPI(`${BASE_URL}${LIST_ADMIN_USERS}`);
    if (
      data?.status === STATUS_CODE?.SUCCESS_CODE ||
      data?.status === STATUS_CODE?.SUCCESS_CODE_1
    ) {
      setDataSource(data?.data);
    } else {
      message.error(data);
    }
  };

  const deleteMember = (row) => {
    DELAPI(`${BASE_URL}${DELETE_ADMIN_USER}${row?.userId}`)
      .then((res) => {
        console.log("res", res);
        if (
          res?.status === STATUS_CODE?.SUCCESS_CODE ||
          res?.status === STATUS_CODE?.SUCCESS_CODE_1
        ) {
          message.success(`Successfully deleted user ${row?.userName}`);
          fetch();
        } else {
          message.error("Something went wrong");
        }
      })
      .catch((err) => {
        console.log("err", err);
        message.error("Something went wrong");
      });
  };

  const DisableUser = () => {
    console.log('row',Row?.status);
    const payload = {
      userId: Row?.userId,
     status: Row?.status === "Enable" ? "Disable" : "Enable",
    };
    PUTAPI(`${BASE_URL}${DISABLE_ADMIN_USERS}`, payload)
      .then((res) => {
        console.log("res", res);
        if (
          res?.status === STATUS_CODE?.SUCCESS_CODE ||
          res?.status === STATUS_CODE?.SUCCESS_CODE_1
        ) {
          message.success("User status updated successfully.");
          fetch();
          setConfirmDisable(false);
        } else {
          message.error("Something went wrong");
          setConfirmDisable(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
        message.error("Something went wrong");
        setConfirmDisable(false);
      });
  };

  const fetch_UserDetails = async (userId) => {
    const data = await GetAPI(`${BASE_URL}${USER_DETAILS}/${userId}`);
    if (
      data?.status === STATUS_CODE?.SUCCESS_CODE ||
      data?.status === STATUS_CODE?.SUCCESS_CODE_1
    ) {
      // setUserDetails(data?.data);
      console.log("datas", data?.data);
      navigate(AdminScreens?.edituser, { state: { userDetails: data?.data } });
    } else {
      message.error(data);
    }
  };

  const editMember = async(row) => {
    console.log(row);
    setRow(row);
    await fetch_UserDetails(row?.userId);
    setMode("edit");
    
  };

  const onCancel = () => {
    setOpenModal(false);
    setEditModal(false);
  };

  const disableMember = (row) => {
    setRow(row);
    setConfirmDisable(true);
  };

  const AddNewUser = () => {
    // setOpenModal(true);
    navigate(AdminScreens?.adduser);
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
      console.log('row',row?.status);
      const val = {
        text: `${row?.status === "Enable" ? "Disable" : "Enable"}`,
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
      dataIndex: "firstName",
      render: (text) => {
        return <div>{text?.charAt(0)?.toUpperCase() + text?.slice(1)}</div>;
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text) => {
        return <div>{text?.charAt(0)?.toUpperCase() + text?.slice(1)}</div>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => {
 
        return <div>{text}</div>;
      },
    },
    {
      title: "Email",
      dataIndex: "emailAddress",
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
        <Title title="User Information" className="Title" />
        <AddUser
          onCancel={onCancel}
          FindLoader={FindLoader}
          Row={Row}
          Mode={Mode}
          fetch={fetch}
          // Roles={Roles}
        />
      </CustomModal>
      <CustomModal
        visible={editModal}
        onCancel={onCancel}
        closeOnPress={onCancel}
        className="AddUser"
      >
        <Title title="User Information" className="Title" />
        <EditUser
          onCancel={onCancel}
          FindLoader={FindLoader}
          Row={Row}
          Mode={Mode}
          fetch={fetch}
        />
      </CustomModal>

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
            text={Row?.status === "Enable" ? "Disable" : "Enable"}
            className="Save"
            onClick={DisableUser}
          />
        </div>
      </CustomModal>
    </div>
  );
};

export default UserProfile;
