import { LeftOutlined } from "@ant-design/icons";
import React from "react";
import Title from "../../sharedComponents/Title/Title";
import CustomButton from "../../sharedComponents/Buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import { AdminScreens } from "../../utils/Routing/RoutePath";

const UpdateProduct = ({ EditUser }) => {
  const navigate = useNavigate();
  return (
    <div className="DetailsTop">
      {EditUser ? (
        <div className="TopLeft">
          <div className="BackBtn">
            <LeftOutlined
              onClick={() => {
                navigate(AdminScreens.users);
              }}
            />
          </div>
          <div className="Titles">
            <Title title="Emp2275628" className="OrderID" />
            <Title title="Employee ID" className="Itemcode" />
          </div>
        </div>
      ) : (
        <div className="TopLeft">
          <div className="BackBtn">
            <LeftOutlined
              onClick={() => {
                navigate(AdminScreens.product);
              }}
            />
          </div>
          <div className="Titles">
            <Title title="ID45454545" className="OrderID" />
            <Title title="Item code" className="Itemcode" />
          </div>

          <div className="StatusContainer">
            <Title className="Active" title="Active" />
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
