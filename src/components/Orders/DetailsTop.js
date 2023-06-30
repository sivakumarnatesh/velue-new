import { LeftOutlined } from "@ant-design/icons";
import React from "react";
import Title from "../../sharedComponents/Title/Title";
import CustomButton from "../../sharedComponents/Buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import { AdminScreens } from "../../utils/Routing/RoutePath";

const DetailsTop = ({ AddProduct, productDetails, EditCustomer, customerName, gstno,id,order,newProduct }) => {
  const navigate = useNavigate();
  console.log('id',id);
  return (
    <div className="DetailsTop">
      <div className="TopLeft">
        <div className="BackBtn">
          <LeftOutlined
            onClick={() => {
              AddProduct
                ? navigate(AdminScreens?.product)
                : EditCustomer
                ? navigate(AdminScreens?.customers)
                : navigate(AdminScreens?.orders);
            }}
          />
        </div>
        <div className="Titles">
          {AddProduct ? (
            <>
              <Title title="ID45454545" className="OrderID" />
              <Title title="Item code" className="Itemcode" />
            </>
          ) : productDetails ? (
            <>
              <Title title="Order ID" className="TOrderID" />
              <Title title="OID45454545" className="OrderID" />
            </>
          ) : order ? (
            <>
        
              <Title title={id} className="OrderID" />
            </>
          ):(
            <>
              <Title title={customerName} className="OrderID" />
              <Title title={gstno} className="Itemcode" />
            </>
          )}
        </div>
        {EditCustomer === false && (
          <div className="StatusContainer">
            {/* <div className="Accept">Accepted</div>
            <div className="Receive">Received</div>
            <div className="Approve">Approved</div>
            <div className="Transit">In-transit</div> */}
            <div className="Deliver">Delivered</div>
            {/* <div className="Reject">Rejected</div> */}
          </div>
        )}
        {AddProduct === false && (
          <div className="StatusContainer">
            {/* <div className="Accept">Accepted</div>
            <div className="Receive">Received</div>
            <div className="Approve">Approved</div>
            <div className="Transit">In-transit</div> */}
            <div className="Deliver">Delivered</div>
            {/* <div className="Reject">Rejected</div> */}
          </div>
        )}
      </div>
      {EditCustomer === false && (
        <div className="Buttons">
          <CustomButton
            text={AddProduct ? "Cancel" : "Reject"}
            className="Reject"
            // onClick={() => onCancel()}
          />
          <CustomButton
            text={AddProduct ? "Save" : "Approve"}
            className="Approve"
            // onClick={validateCredentials}
          />
        </div>
      )}
      {AddProduct && (
        <div className="Buttons">
          <CustomButton
            text={AddProduct ? "Cancel" : "Reject"}
            className="Reject"
            // onClick={() => onCancel()}
          />
          <CustomButton
            text={AddProduct ? "Save" : "Approve"}
            className="Approve"
            onClick={newProduct}
          />
        </div>
      )}
    </div>
  );
};

export default DetailsTop;
