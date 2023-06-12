import React, { useEffect } from "react";
import DetailsTop from "../Orders/DetailsTop";
import "./UserProfile.scss";
import Title from "../../sharedComponents/Title/Title";
import { DatePicker, Form, Input, Select, Upload, message } from "antd";
import { CloudUploadOutlined, InboxOutlined } from "@ant-design/icons";
import UserTop from "./UserTop";
import { useState } from "react";
import { STATUS_CODE } from "../../utils/Variables/DefaultData";
import {
  BASE_URL,
  CREATE_ADMIN_USERS,
  GET_ROLES,
  LIST_ADMIN_USERS,
} from "../../utils/API/EndPoint";
import { GetAPI, POSTAPI } from "../../utils/API";
import {
  firstNameValidation,
  isStringNotEmpty,
  phoneNumberValidation,
} from "../../utils/Validation/Input";
import Loader from "../../sharedComponents/CustomLoader/Loader";
import { AdminScreens } from "../../utils/Routing/RoutePath";
import { Navigate, useNavigate } from "react-router-dom";

function AddUser({ onCancel }) {
  //User Basic Details
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  //User Employment Details
  const [Role, setRole] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [Password, setPassword] = useState("");

  //User Salary Details
  const [accNo, setAccNo] = useState("");
  const [bank, setBank] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [salary, setSalary] = useState("");
  const [panNo, setPanNo] = useState("");
  const [aadharNo, setAadharNo] = useState("");

  const [Loading, setLoading] = useState(false);
  const [Roles, setRoles] = useState([]);

  const { Option } = Select;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    const data = await GetAPI(`${BASE_URL}${GET_ROLES}`);
    if (
      data?.status === STATUS_CODE?.SUCCESS_CODE ||
      data?.status === STATUS_CODE?.SUCCESS_CODE_1
    ) {
      setRoles(data?.data);
    } else {
      message.error(data);
    }
  };

  const validateCredentials = () => {
    setLoading(true);
    if (
      isStringNotEmpty(FirstName) &&
      isStringNotEmpty(LastName) &&
      isStringNotEmpty(Email) &&
      isStringNotEmpty(PhoneNumber) &&
      isStringNotEmpty(dateOfBirth) &&
      isStringNotEmpty(gender) &&
      isStringNotEmpty(contactName) &&
      isStringNotEmpty(contactNumber) &&
      isStringNotEmpty(dateOfJoining) &&
      isStringNotEmpty(Role) &&
      isStringNotEmpty(Password) &&
      isStringNotEmpty(accNo) &&
      isStringNotEmpty(bank) &&
      isStringNotEmpty(ifscCode) &&
      isStringNotEmpty(salary) &&
      isStringNotEmpty(panNo) &&
      isStringNotEmpty(aadharNo)
    ) {
      const payload = {
        firstName: FirstName,
        lastName: LastName,
        emailAddress: Email,
        mobileNumber: PhoneNumber,
        birthDate: dateOfBirth,
        gender: gender,
        emergencyContactName: contactName,
        emergencyContactNumber: contactNumber,
        role: Role,
        dateOfJoining: dateOfJoining,
        password: Password,
        userSalary: {
          accountDetails: accNo,
          bankName: bank,
          ifscCode: ifscCode,
          salaryPerMonth: salary,
          panCardNumber: panNo,
          aadharCardNumber: aadharNo,
        },
      };
      POSTAPI(`${BASE_URL}${CREATE_ADMIN_USERS}`, payload)
        .then((res) => {
          console.log("res", res);
          if (
            res?.status === STATUS_CODE?.SUCCESS_CODE ||
            res?.status === STATUS_CODE?.SUCCESS_CODE_1
          ) {
            setLoading(false);
            message.success("User Register Successfully.");
            navigate(AdminScreens?.users, { state: { fetch: true } });
            // fetch();
          }
        })
        .catch((err) => {
          console.log("err", err);
          setLoading(false);
          message.error(err.message);
        });
    } else {
      message.error("Enter all mandatory fields!");
      setLoading(false);
    }
  };

  const { Dragger } = Upload;

  const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <div className="AddProduct">
      <UserTop validateCredentials={validateCredentials} onCancel={onCancel} />
      {Loading ? (
        <Loader loading={Loading} />
      ) : (
        <div>
          <div className="Details">
            <Title title="Basic Details" className="AccountDetails" />
            <Form
              name="basic"
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <div className="FieldUpload">
                <div>
                  <div className="Account1">
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
                        placeholder="Enter First Name"
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
                        placeholder="Enter Last Name"
                        // defaultValue={LastName}
                      />
                    </Form.Item>
                  </div>
                  <div className="Account2">
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
                    <Form.Item
                      name="phone"
                      label="Mobile Number"
                      // initialValue={PhoneNumber ?? ''}
                      rules={[
                        {
                          required: true,
                          message: "Please input your phone number!",
                        },
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
                  </div>
                  <div className="Account2">
                    <Form.Item
                      label="Select Date of Birth"
                      name="date"
                      rules={[
                        { required: false, message: "Please select DOB!" },
                      ]}
                    >
                      <DatePicker
                        placeholder="Date of Birth"
                        className="datePicker"
                        onChange={(date, dateString) =>
                          setDateOfBirth(dateString)
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      name="gender"
                      label="Select Gender"
                      rules={[
                        { required: false, message: "Please select gender!" },
                      ]}
                    >
                      <Select
                        placeholder="Gender"
                        onChange={(val) => setGender(val)}
                      >
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        {/* <Option value="other">Other</Option> */}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="Account2">
                    <Form.Item
                      name="cname"
                      label="Emergency contact name"
                      rules={[{ required: false }]}
                    >
                      <Input
                        placeholder="Enter emergency contact name"
                        className="weightInput"
                        onChange={(e) => setContactName(e?.target?.value)}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Emergency contact number"
                      name="number"
                      rules={[
                        {
                          required: false,
                          message: "Please input your emergency phone number!",
                        },
                        {
                          pattern: phoneNumberValidation,
                          message: "Phone number is not valid",
                        },
                      ]}
                    >
                      {/* <div className="WeightField"> */}
                      <Input
                        placeholder="Enter emergency contact no"
                        className="weightInput"
                        onChange={(e) => setContactNumber(e?.target?.value)}
                      />

                      {/* </div> */}
                    </Form.Item>
                  </div>
                </div>
                <div className="uploadAddProduct">
                  <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or Drag Product Photo here.
                    </p>
                  </Dragger>
                </div>
              </div>
            </Form>
          </div>
          <div className="SalesContainer">
            <Title title="Employment Details" className="AccountDetails" />
            <Form
              name="basic"
              labelCol={{ span: 24 }}
              initialValues={{ remember: true }}
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div className="salesDetails">
                <Form.Item
                  label="Select Role"
                  name="type"
                  rules={[{ required: true, message: "Please select role!" }]}
                >
                  <Select
                    placeholder="Role"
                    className="Category"
                    onChange={(val) => setRole(val)}
                    allowClear
                  >
                    {Roles?.length > 0 &&
                      Roles?.map((item) => (
                        <Option key={item?.roleId} value={item?.roleId}>
                          {item?.roleName}
                        </Option>
                      ))}
                    {/* <Option value="customer">Customer</Option> */}
                    {/* <Option value="female">HDFC Bank</Option>
                <Option value="other">other</Option> */}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Date of Joining"
                  name="date"
                  rules={[
                    { required: true, message: "Please select joining date!" },
                  ]}
                >
                  <DatePicker
                    className="datePicker"
                    onChange={(date, dateString) =>
                      setDateOfJoining(dateString)
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="units"
                  rules={[
                    { required: false, message: "Please input password!" },
                  ]}
                >
                  <Input
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e?.target?.value)}
                  />
                </Form.Item>
              </div>
            </Form>
          </div>
          <div className="SalesContainer">
            <Title title="Salary Details" className="AccountDetails" />
            <Form
              name="basic"
              labelCol={{ span: 24 }}
              initialValues={{ remember: true }}
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div className="salesDetails">
                <Form.Item
                  label="Account Number"
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: "Please input your account number!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter account number"
                    onChange={(e) => setAccNo(e?.target?.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Select Bank"
                  name="type"
                  rules={[
                    { required: true, message: "Please select bank name!" },
                  ]}
                >
                  <Select
                    placeholder="Bank Name"
                    className="Category"
                    onChange={(val) => setBank(val)}
                    allowClear
                  >
                    <Option value="indianbank">Indian Bank</Option>
                    <Option value="hdfcbank">HDFC Bank</Option>
                    <Option value="other">other</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="IFSC code"
                  name="units"
                  rules={[
                    { required: true, message: "Please input your Ifsc!" },
                  ]}
                >
                  <Input
                    placeholder="Enter IFSC Code"
                    onChange={(e) => setIfscCode(e?.target?.value)}
                  />
                </Form.Item>
              </div>
              <div className="salesDetails">
                <Form.Item
                  label="Salary Per Month"
                  name="quantity"
                  rules={[
                    {
                      required: true,
                      message: "Please input salary (INR)!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter salary (INR)"
                    onChange={(e) => setSalary(e?.target?.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Pan Card Number"
                  name="Quantity"
                  rules={[
                    {
                      required: true,
                      message: "Please input your pan number!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter pan number"
                    onChange={(e) => setPanNo(e?.target?.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Aadhar Number"
                  name="Aadhar"
                  rules={[
                    {
                      required: true,
                      message: "Please input your aadhar number!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter aadhar number"
                    onChange={(e) => setAadharNo(e?.target?.value)}
                  />
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      )}
      <div className="Details">
        <Title title="Documents" className="AccountDetails" />
        <div className="Upload">
          <Form
            name="validate_other"
            // onFinish={onFinishUpload}
            // style={{ maxWidth: 600 }}
          >
            <div className="UploadFiles">
              {/* <Form.Item > */}

              <div className="GSTFile">
                <div className="FileTitle">PAN Card</div>
                <div>
                  <Form.Item
                    name="dragger"
                    label="PAN Card"
                    valuePropName="fileList"
                    // getValueFromEvent={normFile}
                    noStyle
                  >
                    <Upload.Dragger name="files" action="/upload.do">
                      <p className="ant-upload-drag-icon">
                        <CloudUploadOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to this area to upload
                      </p>
                    </Upload.Dragger>
                  </Form.Item>
                </div>
              </div>
              <div className="GSTFile">
                <div className="FileTitle">Aadhar Card</div>
                <div>
                  <Form.Item
                    name="dragger"
                    label="Aadhar Card"
                    valuePropName="fileList"
                    // getValueFromEvent={normFile}
                    noStyle
                  >
                    <Upload.Dragger name="files" action="/upload.do">
                      <p className="ant-upload-drag-icon">
                        <CloudUploadOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to this area to upload
                      </p>
                    </Upload.Dragger>
                  </Form.Item>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
