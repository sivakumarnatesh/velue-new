import React from "react";
import Background from "../Background/Background";
import { Images } from "../../assets/Images/Images";
import "./LoginPage.scss";
import Login from "./Form/Login";
import { useLocation } from "react-router-dom";

function LoginPage() {
  const location = useLocation();
  const { state } = location;

  return (
    <Background
      content={
        <div>
          <div className="LoginPage">
            <div className="LoginLHS">
              <div className="LogoTitle">
                <img src={Images.Logo} alt="Logo" />
                <div className="sponsorBy">by Devi Enterprises</div>
              </div>
              <div>
                <div className="productDesc">
                  Complete Bath Fitting Solutions.
                </div>
              </div>
            </div>
            <div className="LoginRHS">
              <div className="LoginDetails">
                <div className="LoginTitle">Login</div>
                <div className="LoginSubTitle">to place your order</div>
              </div>
              <div className="loginOrSignup">
                <Login val={state?.validPassword} />
              </div>
            </div>
            <div className="Distributors">
              <div className="AuthorisedBrands">Authorised Distributor for</div>
              <div className="brands">
                <img src={Images.Product1} alt="Product1" />
                <img src={Images.Product2} alt="Product2" />
                <img src={Images.Product1} alt="Product1" />
                <img src={Images.Product1} alt="Product1" />
                <img src={Images.Product2} alt="Product2" />
                <img src={Images.Product1} alt="Product1" />
                <img src={Images.Product1} alt="Product1" />
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}

export default LoginPage;
