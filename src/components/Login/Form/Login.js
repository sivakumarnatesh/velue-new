import React, { useEffect, useRef, useState } from "react";
import { Form, Input } from "antd";
import CustomButton from "../../../sharedComponents/Buttons/CustomButton";
import { Images } from "../../../assets/Images/Images";
import Message from "../../../sharedComponents/Message/Message";
import { isStringNotEmpty } from "../../../utils/Validation/Input";
import { AdminScreens } from "../../../utils/Routing/RoutePath";
import { useNavigate } from "react-router-dom";

const Login = ({val}) => {
  const EmailRef = useRef("");
  const PasswordRef = useRef("");
  const LoginRef = useRef("");
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [WrongCred, setWrongCred] = useState(false);

  useEffect(() => {
    EmailRef.current.focus();
  }, []);

  const FocusNext = (e) => {
    if (e.key === "Enter") {
      PasswordRef.current.focus();
    }
  };

  const EmailOnChange = (e) => {
    setEmail(e.target.value);
    setWrongCred(false);
  };

  const PasswordOnchange = (e) => {
    setPassword(e.target.value);
    setWrongCred(false);
  };

  const validateCredentials = () => {
    if (
      isStringNotEmpty(Email) &&
      isStringNotEmpty(Password) &&
      Email === "siva@gmail.com" &&
      Password === "1234"
    ) {
      setWrongCred(false);
      navigate(AdminScreens.users);
    } else {
      setWrongCred(true);
    }
  };
  const FocusToLogin = (e) => {
    if (e.key === "Enter") {
      validateCredentials();
    }
  };
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
    >
     
     <Form.Item>
     {val === false && 
        <Message
          Header=""
          subHeader="Reset Successful
          Please Enter New login Credentials."
          className="resetSuccess"
          val={val}
        />
     }
     {WrongCred && (
          <Message
            Header=""
            subHeader="Login credentials are incorrect. Try Again"
            className="wrongCreds"
          />
        )}
      </Form.Item>

      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<img src={Images.user} alt="email_logo" />}
          value={Email}
          onChange={EmailOnChange}
          placeholder="Email Address"
          ref={EmailRef}
          onKeyDown={FocusNext}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
        hasFeedback
      >
        <Input.Password
          prefix={<img src={Images.password} alt="password_logo" />}
          value={Password}
          onChange={PasswordOnchange}
          type="password"
          placeholder="Password"
          ref={PasswordRef}
          onKeyDown={FocusToLogin}
        />
      </Form.Item>
      <Form.Item>
        <a className="login-form-forgot" href="/forgot-password">
          Forgot Password?
        </a>
      </Form.Item>

      <Form.Item className="RegisterHere">
        <CustomButton text="Register Here." className="RegisterBtn" />
        <CustomButton
          text="Login"
          onClick={validateCredentials}
          className="LoginBtn"
          ref={LoginRef}
        />
      </Form.Item>
    </Form>
  );
};

export default Login;
