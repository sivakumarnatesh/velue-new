import React, { useState } from "react";
import AntdTable from "../../sharedComponents/AntdTable/AntdTable";

const OrderTable = () => {
  const [dataSource, setDataSource] = useState([]);
  // const dataSource = [
  //   {
  //     key: '1',
  //     customeName: 'Mike',
  //     gstNo: 'GST43252545',
  //     orderValue: '1,25,000',
  //     creditValue:'15,00,000',
  //     status:'Delivered',
  //   },
  //   {
  //     key: '2',
  //     customeName: 'John',
  //     gstNo: 'GST43252545',
  //     orderValue: '1,25,000',
  //     creditValue:'15,00,000',
  //     status:'Delivered',
  //   },
  // ];
  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customeName",
      render: () => {
        return <div>Mittal Hardwares</div>;
      },
    },
    {
      title: "GST No.",
      dataIndex: "gstNo",
      render: () => {
        return <div>GST12345678</div>;
      },
    },
    {
      title: "Order Value (Rs.)",
      dataIndex: "orderValue",
      render: () => {
        return <div>11,250,00</div>;
      },
    },
    {
      title: "Credit Value (Rs.)",
      dataIndex: "creditValue",
      render: () => {
        return <div>15,00,000</div>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      // render: (text) => {
      //   return (
      //     <div className="StatusContainer">
      //       <div className="Accept">Accepted</div>
      //       <div className="Receive">Received</div>
      //       <div className="Approve">Approved</div>
      //       <div className="Transit">In-transit</div>
      //       <div className="Deliver">Delivered</div>
      //       <div className="Reject">Rejected</div>
      //     </div>
      //   );
      // },
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
