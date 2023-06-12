import React from "react";
import AntdTable from "../../sharedComponents/AntdTable/AntdTable";
import PopOver from "../../sharedComponents/PopOver/PopOver";
import { MoreOutlined } from "@ant-design/icons";
import { AdminScreens } from "../../utils/Routing/RoutePath";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { GetAPI } from "../../utils/API";
import {
  BASE_URL,
  CUSTOMER_BY_ID,
  LIST_CUSTOMER,
} from "../../utils/API/EndPoint";
import { message } from "antd";
import { STATUS_CODE } from "../../utils/Variables/DefaultData";
import { useState } from "react";

function CustomerTable({ fetchAgain }) {
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch();
  }, [fetchAgain]);

  const editRole = async (row) => {
    // navigate(AdminScreens.updatecustomer);
    await fetch_CustomerDetails(row?.customerId);
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
    // if (true) {
    //   const val = {
    //     text: "Delete",
    //     // onClick: () => deleteMember(row),
    //   };
    //   result = [...result, val];
    // }
    if (true) {
      const val = {
        text: "Disable",
        // onClick: () => disableMember(row),
      };
      result = [...result, val];
    }

    return result;
  };

  const fetch = async () => {
    const data = await GetAPI(`${BASE_URL}${LIST_CUSTOMER}`);
    if (
      data?.status === STATUS_CODE?.SUCCESS_CODE ||
      data?.status === STATUS_CODE?.SUCCESS_CODE_1
    ) {
      setDataSource(data?.data);
    } else {
      message.error(data);
    }
  };
  const fetch_CustomerDetails = async (customerId) => {
    const data = await GetAPI(`${BASE_URL}${CUSTOMER_BY_ID}/${customerId}`);
    if (
      data?.status === STATUS_CODE?.SUCCESS_CODE ||
      data?.status === STATUS_CODE?.SUCCESS_CODE_1
    ) {
      // setUserDetails(data?.data);
      // setCustomerDetails(data?.data);
      console.log("datas", data?.data);
      navigate(AdminScreens?.updatecustomer, {
        state: { customerDetails: data?.data },
      });
    } else {
      message.error(data);
    }
  };

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      //   render: (text) => {
      //     return <div>{text?.charAt(0)?.toUpperCase() + text?.slice(1)}</div>;
      //   },
    },
    {
      title: "GST No.",
      dataIndex: "gstno",
      //   render: (text) => {
      //     return <div>{text?.charAt(0)?.toUpperCase() + text?.slice(1)}</div>;
      //   },
    },
    {
      title: "Contact Name",
      dataIndex: "contactName",
      //   render: (text) => {
      //     return <div>{text?.charAt(0)?.toUpperCase() + text?.slice(1)}</div>;
      //   },
    },
    {
      title: "Contact Mobile Number",
      dataIndex: "primaryNumber",
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

export default CustomerTable;
