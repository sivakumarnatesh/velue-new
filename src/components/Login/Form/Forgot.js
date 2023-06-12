import React, { useEffect, useRef, useState } from "react";
import { Form, Input } from "antd";
import CustomButton from "../../../sharedComponents/Buttons/CustomButton";
import { Images } from "../../../assets/Images/Images";
import Message from "../../../sharedComponents/Message/Message";
import { isStringNotEmpty } from "../../../utils/Validation/Input";

const Forgot = () => {
  const EmailRef = useRef("");
  const [form] = Form.useForm();

  const [Email, setEmail] = useState("");
  const [WrongCred, setWrongCred] = useState(true);

  useEffect(() => {
    EmailRef.current.focus();
  }, []);

  const EmailOnChange = (e) => {
    setEmail(e.target.value);
    setWrongCred(true);
  };

  const validateCredentials = () => {
    if (isStringNotEmpty(Email) && Email === "siva@gmail.com") {
      setWrongCred(false);
      form.resetFields();
    } else {
      setWrongCred(true);
    }
  };

  const FocusNext = (e) => {
    if (e.key === "Enter") {
      validateCredentials();
    }
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      form={form}
    >
      <Form.Item>
        {WrongCred ? (
          <Message
            Header="Forgot password?"
            subHeader="Enter your Registered Mail ID."
            className="forgotPassword"
          />
        ) : (
          <Message
            Header="Forgot password?"
            subHeader="Click on the password reset link sent to your registered mail id."
            className="resetLink"
          />
        )}
      </Form.Item>

      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<img src={Images.user} alt="EmailIcon" />}
          onKeyDown={FocusNext}
          value={Email}
          onChange={EmailOnChange}
          placeholder="Email Address"
          ref={EmailRef}
        />
      </Form.Item>

      <Form.Item className="RegisterHere">
        <CustomButton
          text="Send Credentials"
          onClick={validateCredentials}
          className="ForgotBtn"
          //   ref={SendCredRef}
        />
      </Form.Item>
    </Form>
  );
};

export default Forgot;
