import React, { useState } from "react";
import { Form, Input, Select, message } from "antd";
import CustomButton from "../../../sharedComponents/Buttons/CustomButton";
import { POSTAPI } from "../../../utils/API";
import { BASE_URL, CREATE_ADMIN_USERS } from "../../../utils/API/EndPoint";
import { STATUS_CODE } from "../../../utils/Variables/DefaultData";
import {
  firstNameValidation,
  isStringNotEmpty,
  passwordValidation,
  phoneNumberValidation,
} from "../../../utils/Validation/Input";

const { Option } = Select;

const AddUser = ({ onCancel, FindLoader, Row, Mode, fetch, Roles }) => {
  console.log('Roles',Row)
  // Roles.map((item) => {
  //   console.log('item',item?.roleName)
  // })
  
  const [form] = Form.useForm();
  const [UserName, setUserName] = useState(Row?.userName ?? "");
  const [FirstName, setFirstName] = useState(
    Mode == "edit" ? Row?.firstName : ""
  );
  const [LastName, setLastName] = useState(Row?.lastName ?? "");
  const [Email, setEmail] = useState(Row?.emailId ?? "");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Role, setRole] = useState(Row?.userRole ?? "");
  const [Password, setPassword] = useState(Row?.userPassword ?? "");

  const validateCredentials = () => {
    FindLoader(true);
    if (
      isStringNotEmpty(UserName) &&
      isStringNotEmpty(FirstName) &&
      isStringNotEmpty(LastName) &&
      isStringNotEmpty(Email) &&
      isStringNotEmpty(PhoneNumber) &&
      isStringNotEmpty(Role) &&
      isStringNotEmpty(Password)
    ) {
      const payload = {
        userName: UserName,
        firstName: FirstName,
        lastName: LastName,
        emailId: Email,
        phoneNumber: PhoneNumber,
        // userRole: Role,
        userRoleId: Role,
        userPassword: Password,
        userStatus: "active",
      };
      POSTAPI(`${BASE_URL}${CREATE_ADMIN_USERS}`, payload)
        .then((res) => {
          console.log("res", res);
          if (
            res?.status === STATUS_CODE?.SUCCESS_CODE ||
            res?.status === STATUS_CODE?.SUCCESS_CODE_1
          ) {
            onCancel();
            FindLoader(false);
            message.success("User Register Successfully.");
            fetch();
          }
        })
        .catch((err) => {
          console.log("err", err);
          FindLoader(false);
          message.error(err.message);
        });
    } else {
      message.error("Enter all mandatory fields!");
    }
  };

  return (
    <Form form={form} name="adduser" scrollToFirstError>
      <div className="userName">
        <Form.Item
          name="firstname"
          label="First Name"
          tooltip="What is your firstname?"
          // initialValue=''
          rules={[
            {
              required: true,
              message: "Please input your firstname!",
              whitespace: true,
            },
            {
              pattern: firstNameValidation,
              message: "FirstName should be min 2 char",
            },
          ]}
        >
          <Input
            onChange={(e) => setFirstName(e?.target?.value)}
            placeholder="First Name"
            // value={FirstName}
          />
        </Form.Item>
        <Form.Item
          name="lastname"
          label="Last Name"
          tooltip="What is your lastname?"
          rules={[
            {
              required: true,
              message: "Please input your lastname!",
              whitespace: true,
            },
            {
              pattern: firstNameValidation,
              message: "LastName should be min 2 char",
            },
          ]}
        >
          <Input
            onChange={(e) => setLastName(e?.target?.value)}
            placeholder="Last Name"
            // defaultValue={LastName}
          />
        </Form.Item>
      </div>
      <div className="ContactDetails">
        <Form.Item
          name="userName"
          label="User Name"
          tooltip="What is your username?"
          // initialValue={FirstName}
          rules={[
            {
              required: true,
              message: "Please input your username!",
              whitespace: true,
            },
          ]}
        >
          <Input
            onChange={(e) => setUserName(e?.target?.value)}
            placeholder="User Name"
            // value={UserName}
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email Address"
          // initialValue={Row !== null || Row !== undefined ? Row?.emailId : ''}
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
          <Input
            onChange={(e) => setEmail(e?.target?.value)}
            placeholder="E-mail"
            className="email"
            // value={Email}
          />
        </Form.Item>
      </div>
      <div className="Auth">
        <Form.Item
          name="phone"
          label="Mobile Number"
          // initialValue={PhoneNumber ?? ''}
          rules={[
            { required: true, message: "Please input your phone number!" },
            {
              pattern: phoneNumberValidation,
              message: "Phone number is not valid",
            },
          ]}
        >
          <Input
            onChange={(e) => setPhoneNumber(e?.target?.value)}
            // value={PhoneNumber}
            placeholder="Mobile Number"
          />
        </Form.Item>
        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please select role!" }]}
        >
          <Select
            placeholder="select your role"
            onChange={(val) => setRole(val)}
          >
            {Roles.length > 0  && Roles.map((item) => (
                <Option key={item?.roleId} value={item?.roleId}>{item?.roleName}</Option>
                
              ))}

            {/* <Option value="admin">Admin</Option>
            <Option value="other">Other</Option> */}
          </Select>
        </Form.Item>
        
        <Form.Item
          name="password"
          label="Password"
          className="passwordField"
          rules={[
            { required: true, message: "Please input your Password!" },
            {
              pattern: passwordValidation,
              message: "Please input your Password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            onChange={(e) => setPassword(e?.target?.value)}
            type="password"
            placeholder="Password"
            // value={Password}
          />
        </Form.Item>
        <div className="addUserBtn">
          {/* <Form.Item> */}

          <CustomButton
            text="Cancel"
            className="Cancel"
            onClick={() => onCancel()}
          />
          <CustomButton
            text="Save"
            className="Save"
            onClick={validateCredentials}
          />

          {/* </Form.Item> */}
        </div>
      </div>
    </Form>
    
  );
};

export default AddUser;
