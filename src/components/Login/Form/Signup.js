import React from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
} from "antd";
import CustomButton from "../../../sharedComponents/Buttons/CustomButton";
import { Images } from "../../../assets/Images/Images";

const { Option } = Select;

const Signup = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
          {/* <Form.Item
        name="firstname"
        tooltip="What is your firstname?"
        rules={[
          {
            required: true,
            message: "Please input your firstname!",
            whitespace: true,
          },
        ]}
      >
        <Input  prefix={<img src={Images.user} />} placeholder="First Name" />
      </Form.Item>
      <Form.Item
        name="lastname"
        tooltip="What is your lastname?"
        rules={[
          {
            required: true,
            message: "Please input your lastname!",
            whitespace: true,
          },
        ]}
      > 
        <Input  prefix={<img src={Images.user} />}  placeholder="Last Name" />
      </Form.Item>*/}
      <Form.Item
        name="FullName"
        rules={[{ required: true, message: "Please input your Fullname!" }]}
      >
        <Input
          prefix={<img src={Images.user} />}
          placeholder="Full Name"

        />
      </Form.Item>
      <Form.Item
        name="email"
       
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input  placeholder="E-mail" className="email" />
      </Form.Item> 
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
        hasFeedback
      >
        <Input.Password
          prefix={<img src={Images.password} />}
          type="password"
          placeholder="Password"
          
        />
      </Form.Item>
  <div className="ageGender">
      <Form.Item
        name={["user", "age"]}
        
        rules={[{ type: "number", min: 1, max: 99 }]}
      >
        <InputNumber placeholder="Age" className="age" />
      </Form.Item>
      <Form.Item
        name="gender"
        rules={[{ required: true, message: "Please select gender!" }]}
      >
        <Select placeholder="select your gender" className="gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>
      </div>

      <Form.Item
        name="address"
        
        rules={[{ required: true, message: "Please input address" }]}
      >
        <Input.TextArea showCount maxLength={100} placeholder="Street, city, state and zip Address" />
      </Form.Item>
      <Form.Item>
        <CustomButton text="Sign up" className="LoginBtn" />
      </Form.Item>
    </Form>
  );
};

export default Signup;
