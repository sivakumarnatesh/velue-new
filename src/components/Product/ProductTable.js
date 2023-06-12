import React, { useEffect, useState } from "react";
import AntdTable from "../../sharedComponents/AntdTable/AntdTable";
import PopOver from "../../sharedComponents/PopOver/PopOver";
import { MoreOutlined } from "@ant-design/icons";
import { AdminScreens } from "../../utils/Routing/RoutePath";
import { useNavigate } from "react-router-dom";
import { Images } from "../../assets/Images/Images";
import Title from "../../sharedComponents/Title/Title";
import { GetAPI } from "../../utils/API";
import {
  BASE_URL,
  LIST_PRODUCT,
  LIST_PRODUCT_UNITS,
} from "../../utils/API/EndPoint";
import { STATUS_CODE } from "../../utils/Variables/DefaultData";
import { message } from "antd";

function ProductTable() {
  const [dataSource, setDataSource] = useState([]);
  const [productPackage, setproductPackage] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch();
  }, []);

  const editRole = (row) => {
    navigate(AdminScreens.productDetail);
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
  console.log("data", dataSource);
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

  // const dataSource = [
  //   {
  //     key: 1,
  //     goods: "Laskhmi Enterprises",
  //     stock: "250000",
  //     restock: "5000",
  //     units: "Pcs",
  //     status:'Active',
  //   },
  // ];
  console.log("package", productPackage);
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
              <img src={record?.image} alt="Product_image" />
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
      dataIndex: "packing_type",
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
