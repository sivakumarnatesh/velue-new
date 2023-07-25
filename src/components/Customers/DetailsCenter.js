import React from "react";
import Title from "../../sharedComponents/Title/Title";

const DetailsCenter = ({EditCustomer,customerDetails,orderdetail}) => {
  console.log('orderdetail',customerDetails)
  return (
    <div className="DetailsCenter">
      <div className="DetailsLHS">
        <div>
          <Title title="Customer" className="Customer" />
          <Title title={customerDetails?.customerName} className="CustomerName" />
          <Title title={customerDetails?.gstno} className="GST" />
          {/* <div className="CustomerAddress">
            Site No. 05 , Opposite to JVM Garden Apartment Building, Bangalore
            560081
          </div> */}
        </div>
        <div className="ContactInfo">
          <Title title="Contact" className="Contact" />
          <Title title={customerDetails?.contactName} className="CustomerName" />
          <Title title={customerDetails?.primaryNumber} className="PhoneNumber" />
        </div>
      </div>
      <div className="DetailsRHS">
        <div>
          <div>
            <Title title="Credit Limit" className="Contact" />
            <Title title={customerDetails?.creditLimitAmount} className="CustomerName" />
          </div>
          <div className="Amount">
            <Title title="Order Amount" className="Contact" />
            <Title title='250000' className="CustomerName" />
          </div>
        </div>
        <div>
          <div>
            <Title title="Credit Days" className="Contact" />
            <Title title={customerDetails?.creditLimitDays} className="CustomerName" />
          </div>
          <div className="Amount">
            <Title title="Outstanding Amount" className="Contact" />
            <Title title={customerDetails?.outstandingLimit} className="CustomerName" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsCenter;
