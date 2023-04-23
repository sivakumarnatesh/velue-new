import React, { useEffect, useRef, useState } from "react";
import { Form, Input } from "antd";
import CustomButton from "../../../sharedComponents/Buttons/CustomButton";
import { Images } from "../../../assets/Images/Images";
import Message from "../../../sharedComponents/Message/Message";
import { isStringNotEmpty } from "../../../utils/Validation/Input";
import { useNavigate } from "react-router-dom";

const Password = () => {
  const PasswordRef = useRef("");
  const ConfirmPasswordRef = useRef("");
  const navigate = useNavigate();

  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [WrongCred, setWrongCred] = useState(false);

  useEffect(() => {
    PasswordRef.current.focus();
  }, []);

  const FocusNext = (e) => {
    if (e.key === "Enter") {
      ConfirmPasswordRef.current.focus();
    }
  };

  const PasswordOnchange = (e) => {
    setPassword(e.target.value);
    setWrongCred(false);
  };

  const ConfirmPasswordOnchange = (e) => {
    setConfirmPassword(e.target.value);
    setWrongCred(false);
  };

  const validateCredentials = () => {
    if (
      isStringNotEmpty(ConfirmPassword) &&
      isStringNotEmpty(Password) &&
      Password === ConfirmPassword
    ) {
      setWrongCred(false);
      navigate("/", {state:{validPassword:WrongCred}});
    } else {
      setWrongCred(true);
    }
  };
  const FocusToReset = (e) => {
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
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<img src={Images.password} alt="password_logo" />}
          label="Password"
          value={Password}
          onChange={PasswordOnchange}
          type="password"
          placeholder="Password"
          ref={PasswordRef}
          onKeyDown={FocusNext}
        />
      </Form.Item>
      <Form.Item
        name="confirm"
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<img src={Images.password} alt="confirm_password_logo" />}
          label="Confirm Password"
          dependencies={["password"]}
          value={ConfirmPassword}
          onChange={ConfirmPasswordOnchange}
          type="password"
          placeholder="Retype-Password"
          ref={ConfirmPasswordRef}
          onKeyDown={FocusToReset}
        />
      </Form.Item>
      <Form.Item className="RegisterHere">
        <CustomButton
          text="Reset"
          onClick={validateCredentials}
          className="LoginBtn"
        />
      </Form.Item>
    </Form>
  );
};

export default Password;
