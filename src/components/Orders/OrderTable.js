import React, { useEffect, useState } from "react";
import AntdTable from "../../sharedComponents/AntdTable/AntdTable";
import { useNavigate } from "react-router-dom";
import { AdminScreens } from "../../utils/Routing/RoutePath";
import { STATUS_CODE } from "../../utils/Variables/DefaultData";
import {
  BASE_URL,
  DELETE_ORDER,
  LIST_ORDER,
  SEARCH_ORDER,
} from "../../utils/API/EndPoint";
import { DELAPI, GetAPI } from "../../utils/API";
import { message } from "antd";
import PopOver from "../../sharedComponents/PopOver/PopOver";
import { MoreOutlined } from "@ant-design/icons";

const OrderTable = ({ val }) => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const data = await GetAPI(`${BASE_URL}${LIST_ORDER}`);
    console.log("data", data?.data);
    if (
      data?.status === STATUS_CODE?.SUCCESS_CODE ||
      data?.status === STATUS_CODE?.SUCCESS_CODE_1
    ) {
      setDataSource(data?.data);
    } else {
      console.error(data);
    }
  };

  useEffect(() => {
    if (val !== "") {
      fetchById();
    } else {
      fetch();
    }
  }, [val]);

  const fetchById = async () => {
    const data = await GetAPI(
      `${BASE_URL}${SEARCH_ORDER}${val}?searchType=ORDER_ID`
    );
    console.log("data", data?.data);
    if (
      data?.status === STATUS_CODE?.SUCCESS_CODE ||
      data?.status === STATUS_CODE?.SUCCESS_CODE_1
    ) {
      setDataSource([data?.data]);
    } else {
      message.error(data);
    }
  };

  const viewRole = async (row) => {
    navigate(AdminScreens.orderdetails, {
      state: { orderDetails: row },
    });
  };

  const deleteRole = async (row) => {
    console.log("row", row);
    DELAPI(`${BASE_URL}${DELETE_ORDER}${row?.orderId}`)
      .then((res) => {
        console.log("res", res);
        if (
          res?.status === STATUS_CODE?.SUCCESS_CODE ||
          res?.status === STATUS_CODE?.SUCCESS_CODE_1
        ) {
          message.success(`Successfully deleted order ${row?.orderId}`);
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

  const assignContentData = (row) => {
    let result = [];
    if (true) {
      const val = {
        text: "View",
        onClick: () => viewRole(row),
      };
      result = [...result, val];
    }
    if (true) {
      const val = {
        text: "Delete",
        onClick: () => deleteRole(row),
      };
      result = [...result, val];
    }

    return result;
  };

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customer",
      render: (row) => {
        return <div>{row?.customerName}</div>;
      },
    },
    {
      title: "GST No.",
      dataIndex: "customer",
      render: (row) => {
        return <div>{row?.gstno}</div>;
      },
    },
    {
      title: "Order Value (Rs.)",
      dataIndex: "totalAmount",
      // render: () => {
      //   return <div onClick={() => navigate(AdminScreens.orderdetails)}>11,250,00</div>;
      // },
    },
    {
      title: "Credit Value (Rs.)",
      dataIndex: "customer",
      render: (row) => {
        return <div>{row?.creditLimitAmount}</div>;
      },
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      // render: () => {
      //   return (
      //     <div className="StatusContainer" onClick={() => navigate(AdminScreens.orderdetails)}>
      //       {/* <div className="Accept">Accepted</div>
      //       <div className="Receive">Received</div>
      //       <div className="Approve">Approved</div>
      //       <div className="Transit">In-transit</div> */}
      //       <div className="Deliver">Delivered</div>

      //       {/* <div className="Reject">Rejected</div> */}
      //     </div>
      //   );
      // },
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
    <div>
      <AntdTable
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: true }}
        limit={6}
      />
    </div>
  );
};

export default OrderTable;
