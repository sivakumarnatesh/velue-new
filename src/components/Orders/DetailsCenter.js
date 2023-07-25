import React from "react";
import Title from "../../sharedComponents/Title/Title";

const DetailsCenter = ({EditCustomer,customerDetails,orderdetail}) => {
  console.log('orderdetail',customerDetails)
  return (
    <div className="DetailsCenter">
      <div className="DetailsLHS">
        <div>
          <Title title="Customer" className="Customer" />
          <Title title={orderdetail?.customer?.customerName} className="CustomerName" />
          <Title title={orderdetail?.customer?.gstno} className="GST" />
          {/* <div className="CustomerAddress">
            Site No. 05 , Opposite to JVM Garden Apartment Building, Bangalore
            560081
          </div> */}
        </div>
        <div className="ContactInfo">
          <Title title="Contact" className="Contact" />
          <Title title={orderdetail?.customer?.contactName} className="CustomerName" />
          <Title title={orderdetail?.customer?.primaryNumber} className="PhoneNumber" />
        </div>
      </div>
      <div className="DetailsRHS">
        <div>
          <div>
            <Title title="Credit Limit" className="Contact" />
            <Title title={orderdetail?.customer?.creditLimitAmount} className="CustomerName" />
          </div>
          <div className="Amount">
            <Title title="Order Amount" className="Contact" />
            <Title title={orderdetail?.totalAmount} className="CustomerName" />
          </div>
        </div>
        <div>
          <div>
            <Title title="Credit Days" className="Contact" />
            <Title title={orderdetail?.customer?.creditLimitDays} className="CustomerName" />
          </div>
          <div className="Amount">
            <Title title="Outstanding Amount" className="Contact" />
            <Title title={orderdetail?.customer?.outstandingLimit} className="CustomerName" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsCenter;
