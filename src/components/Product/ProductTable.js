import React, { useEffect, useState } from "react";
import AntdTable from "../../sharedComponents/AntdTable/AntdTable";
import PopOver from "../../sharedComponents/PopOver/PopOver";
import { MoreOutlined } from "@ant-design/icons";
import { AdminScreens } from "../../utils/Routing/RoutePath";
import { useNavigate } from "react-router-dom";
import { Images } from "../../assets/Images/Images";
import Title from "../../sharedComponents/Title/Title";
import { GetAPI, PATCHAPI } from "../../utils/API";
import {
  BASE_URL,
  EDIT_PRODUCT,
  LIST_PRODUCT,
  LIST_PRODUCT_UNITS,
  SEARCH_PRODUCT,
} from "../../utils/API/EndPoint";
import { STATUS_CODE } from "../../utils/Variables/DefaultData";
import { message } from "antd";

function ProductTable({ val }) {
  const [dataSource, setDataSource] = useState([]);
  const [productPackage, setproductPackage] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch();
  }, []);

  const editRole = (row) => {
    navigate(AdminScreens.productDetail, { state: { productDetail: row } });
  };

  const fetch = async () => {
    const data = await GetAPI(`${BASE_URL}${LIST_PRODUCT}`);
    if (
      data?.status === STATUS_CODE?.SUCCESS_CODE ||
      data?.status === STATUS_CODE?.SUCCESS_CODE_1
    ) {
      setDataSource(data?.data);
    } else {
      message.error(data);
    }
    fetchPackage();
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
      `${BASE_URL}${SEARCH_PRODUCT}${val}?productSearchType=PRODUCT_ID`
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
  const fetchPackage = async () => {
    const data = await GetAPI(`${BASE_URL}${LIST_PRODUCT_UNITS}`);
    if (
      data?.status === STATUS_CODE?.SUCCESS_CODE ||
      data?.status === STATUS_CODE?.SUCCESS_CODE_1
    ) {
      setproductPackage(data?.data);
    } else {
      message.error(data);
    }
  };
  const disableMember = (row) => {
    console.log("row", row);
    const headers = {
      "Content-Type": "application/json",
    };
    const status = row?.status === "Inactive" ? "Active" : "Inactive";
    PATCHAPI(`${BASE_URL}${EDIT_PRODUCT}${row?.productId}/${status}`, headers)
      .then((res) => {
        console.log("res", res);
        if (
          res?.status === STATUS_CODE?.SUCCESS_CODE ||
          res?.status === STATUS_CODE?.SUCCESS_CODE_1
        ) {
          // onCancel();
          // FindLoader(false);
          message.success("Product status updated successfully.");
          // navigate(AdminScreens?.product);
          fetch();
        }
      })
      .catch((err) => {
        console.log("err", err);
        // FindLoader(false);
        message.error(err.message);
      });
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
        text: row?.status === "Active" ? "Deactivate" : "Activate",
        onClick: () => disableMember(row),
      };
      result = [...result, val];
    }

    return result;
  };

  const columns = [
    {
      title: "Goods Description",
      dataIndex: "productName",
      width: "25%",
      render: (text, record) => {
        console.log("rec", text);
        console.log("redsgs", record);
        return (
          <div className="Goods">
            <div>
              <img
                src={record?.image}
                style={{ width: "64px", height: "64px", borderRadius: "8px" }}
                alt="Product_image"
              />
            </div>
            <div>
              <div className="ProductName">{record?.productName}</div>
              <div>
                <div className="GoodsDetails">
                  <Title title="Item Code:" className="CodeTitle" />
                  <Title title="ID45897834" className="Code" />
                </div>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Stock in hand",
      dataIndex: "stockInHand",
      width: "15%",
      //   render: (text) => {
      //     return <div>{text?.charAt(0)?.toUpperCase() + text?.slice(1)}</div>;
      //   },
    },
    {
      title: "Restock level",
      dataIndex: "reStockLevel",
      width: "15%",
      //   render: (text) => {
      //     return <div>{text?.charAt(0)?.toUpperCase() + text?.slice(1)}</div>;
      //   },
    },
    {
      title: "Units",
      dataIndex: "unitName",
      width: "15%",
      //   render: (text) => {
      //     return <div>{text?.charAt(0)?.toUpperCase() + text?.slice(1)}</div>;
      //   },
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "10%",
      render: (text) => {
        return <div className="Status">{text}</div>;
      },
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      width: "10%",
      align: "center",
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

export default ProductTable;
