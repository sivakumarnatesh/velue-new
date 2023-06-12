import React from "react";
import AntdTable from "../../sharedComponents/AntdTable/AntdTable";
import OrderTop from "./OrderTop";
import "./Orders.scss";
import DetailsTop from "./DetailsTop";
import DetailsCenter from "./DetailsCenter";
import { Images } from "../../assets/Images/Images";
import Title from "../../sharedComponents/Title/Title";
import { useLocation } from "react-router-dom";

const OrderDetails = () => {
  const location = useLocation();

  const dataSource = [
    {
      key: "1",
      sno: "1",
      goods: "Neo Slim",
      hsnsac: "5635630",
      dueon: "6 Apr 2023",
      quantity: "5 pcs",
      mrp: "346.00",
      per: "Pcs",
      discount: "15.25%",
      amount: "1,154.34",
    },
    {
      key: "2",
      sno: "2",
      goods: "Neo Slim",
      hsnsac: "5635630",
      dueon: "6 Apr 2023",
      quantity: "5 pcs",
      mrp: "346.00",
      per: "Pcs",
      discount: "15.25%",
      amount: "1,154.34",
    },
  ];
  const columns = [
    {
      title: "S.No",
      dataIndex: "sno",
    },
    {
      title: "Goods Description",
      dataIndex: "goods",
      render: () => {
        return (
          <div className="Goods">
            <div>
              <img src={Images.OrderedProduct} alt="Product_image" />
            </div>
            <div>
              <div className="ProductName">BathTub</div>
              <div>
                <div className="GoodsDetails">
                  <Title title="Item Code:" className='CodeTitle' />
                  <Title title="ID45897834" className='Code' />
                </div>
                <div className="GoodsDetails">
                  <Title title="Modal:" className='CodeTitle' />
                  <Title title="Jaquar" className='Code' />
                </div>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "HSN/SAC",
      dataIndex: "hsnsac",
    },
    {
      title: "Due on",
      dataIndex: "dueon",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "MRP(Rs.)",
      dataIndex: "mrp",
    },
    {
      title: "Per",
      dataIndex: "per",
    },
    {
      title: "Disc%",
      dataIndex: "discount",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
  ];
  return (
    <div className="OrderDetails">
      <DetailsTop id={location?.state?.orderDetails?.orderId} order={true} />
      <DetailsCenter orderdetail={location?.state?.orderDetails} />
      <OrderTop status={false} />
      <AntdTable
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: true }}
        limit={6}
      />
    </div>
  );
};

export default OrderDetails;
