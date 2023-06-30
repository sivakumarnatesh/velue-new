import React, { useState } from "react";
import "../Product/Product.scss";
import "./UserProfile.scss";
import UpdateProduct from "../Product/UpdateProduct";
import Title from "../../sharedComponents/Title/Title";
import CustomButton from "../../sharedComponents/Buttons/CustomButton";
import { DatePicker, Form, Input, Select, Upload, message } from "antd";
import ImgCrop from "antd-img-crop";
import {
  LoadingOutlined,
  PlusOutlined,
  InboxOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import CustomModal from "../../sharedComponents/Modal/CustomModal";
import { Images } from "../../assets/Images/Images";
import {
  firstNameValidation,
  phoneNumberValidation,
} from "../../utils/Validation/Input";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { GetAPI, PUTAPI } from "../../utils/API";
import { BASE_URL, LIST_ADMIN_USERS, MODIFY_BASIC_DETAILS, MODIFY_ROLE_DETAILS } from "../../utils/API/EndPoint";
import { STATUS_CODE } from "../../utils/Variables/DefaultData";
import Loader from "../../sharedComponents/CustomLoader/Loader";
import { AdminScreens } from "../../utils/Routing/RoutePath";

dayjs.extend(customParseFormat);

const EditUser = () => {
  const location = useLocation();
  const userDetails = location?.state?.userDetails;
  const [fileList, setFileList] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [editItem, setEditItem] = useState(false);
  const [editSales, setEditSales] = useState(false);
  const [editInventory, setEditInventory] = useState(false);
  const [editPurchase, setEditPurchase] = useState(false);

  //Basic Details
  const [FirstName, setFirstName] = useState(userDetails?.firstName ?? "");
  const [LastName, setLastName] = useState(userDetails?.lastName ?? "");
  const [Email, setEmail] = useState(userDetails?.emailAddress ?? "");
  const [PhoneNumber, setPhoneNumber] = useState(
    userDetails?.mobileNumber ?? ""
  );
  const [dateOfBirth, setDateOfBirth] = useState(userDetails?.birthDate ?? "");
  const [contactName, setContactName] = useState(
    userDetails?.emergencyContactName ?? ""
  );
  const [contactNumber, setContactNumber] = useState(
    userDetails?.emergencyContactNumber ?? ""
  );
  const [gender, setGender] = useState(userDetails?.gender ?? "");

  //Role details
  const [Role,setRole] = useState(userDetails?.role ?? '');
  const [Password,setPassword] = useState(userDetails?.password ?? '');
  const [DateOfJoining,setDateOfJoining] = useState(userDetails?.dateOfJoining ?? '');
  const [loading, setLoading] = useState(false);

  const { Option } = Select;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  console.log("location", userDetails);

  const onGenderChange = (value) => {
    switch (value) {
      case "male":
        form.setFieldsValue({ note: "Hi, man!" });
        break;
      case "female":
        form.setFieldsValue({ note: "Hi, lady!" });
        break;
      case "other":
        form.setFieldsValue({ note: "Hi there!" });
        break;
      default:
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

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const uploadButton = (
    <div>
      {<PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const viewMore = () => {
    setShowDetails(true);
  };
  const EditItemDetails = () => {
    setEditItem(true);
  };
  const EditSalesDetails = () => {
    setEditSales(true);
  };
  const EditInventoryDetails = () => {
    setEditInventory(true);
  };
  const EditPurchaseDetails = () => {
    setEditPurchase(true);
  };
  const onCancel = () => {
    setShowDetails(false);
    setEditItem(false);
    setEditSales(false);
    setEditInventory(false);
    setEditPurchase(false);
  };
  
  const modifyBasicDetails = () => {
    setLoading(true);
    const payload = {
      userId:userDetails?.userId,
      firstName: FirstName,
      lastName: LastName,
      emailAddress: Email,
      mobileNumber: PhoneNumber,
      birthDate: dateOfBirth,
      gender: gender,
      emergencyContactName: contactName,
      emergencyContactNumber: contactNumber,
    };
    PUTAPI(`${BASE_URL}${MODIFY_BASIC_DETAILS}`, payload)
      .then((res) => {
        console.log("res", res);
        if (
          res?.status === STATUS_CODE?.SUCCESS_CODE ||
          res?.status === STATUS_CODE?.SUCCESS_CODE_1
        ) {
          setLoading(false);
          message.success("User Basic Details updated Successfully.");
          setEditItem(false);
          navigate(AdminScreens?.users, { state: { fetch: true } });
          
        }
      })
      .catch((err) => {
        console.log("err", err);
        setEditItem(false);
        setLoading(false);
        message.error(err.message);
      });
  };
  const modifyRoleDetails = () => {
    setLoading(true);
    const payload = {
      userId: userDetails?.userId,
      role: Role,
      password: Password,
      dateOfJoining: DateOfJoining
    };
    PUTAPI(`${BASE_URL}${MODIFY_ROLE_DETAILS}`, payload)
      .then((res) => {
        console.log("res", res);
        if (
          res?.status === STATUS_CODE?.SUCCESS_CODE ||
          res?.status === STATUS_CODE?.SUCCESS_CODE_1
        ) {
          setLoading(false);
          message.success("User Role Details updated Successfully.");
          setEditItem(false);
          navigate(AdminScreens?.users, { state: { fetch: true } });
          
        }
      })
      .catch((err) => {
        console.log("err", err);
        setEditItem(false);
        setLoading(false);
        message.error(err.message);
      });
  };
  const dateOnChange = (date, dateString) => {
    setDateOfBirth(dateString);
  };

  return (
    <div className="ProductDetail">
      <UpdateProduct EditUser={true} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="ItemDetails">
            <div className="ItemEdit">
              <Title title="Basic Details" className="ItemDetails" />
              <CustomButton
                text="Edit"
                onClick={EditItemDetails}
                className="Edit"
              />
            </div>
            <div className="ImageUploadDetails">
              <div className="IDetails">
                <div className="Details">
                  <Title title="Full Name" className="IName" />
                  <Title
                    title={userDetails?.firstName + " " + userDetails?.lastName}
                    className="IValue"
                  />
                </div>
                <div className="Details">
                  <Title title="Email Address" className="IName" />
                  <Title title={userDetails?.emailAddress} className="IValue" />
                </div>
                <div className="Details">
                  <Title title="Mobile number" className="IName" />
                  <Title title={userDetails?.mobileNumber} className="IValue" />
                </div>
                <div className="Details">
                  <Title title="Birth Date" className="IName" />
                  <Title title={userDetails?.birthDate} className="IValue" />
                </div>
                <div className="Details">
                  <Title title="Emergency Contact" className="IName" />
                  <Title
                    title={
                      userDetails?.emergencyContactName +
                      "-" +
                      userDetails?.emergencyContactNumber
                    }
                    className="IValue"
                  />
                </div>
              </div>
              <div className="ProductImage">
                <ImgCrop rotationSlider>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                  >
                    <div>{fileList.length < 1 && uploadButton}</div>
                  </Upload>
                </ImgCrop>
                <CustomButton
                  text="View More Details"
                  onClick={viewMore}
                  className="MoreDetails"
                />
              </div>
            </div>
          </div>
          <div className="ItemDetails">
            <div className="ItemEdit">
              <Title title="Employee Details" className="ItemDetails" />
              <CustomButton
                text="Edit"
                onClick={EditSalesDetails}
                className="Edit"
              />
            </div>

            <div className="IDetails">
              <div className="Details">
                <Title title="Role" className="IName" />
                <Title title={userDetails?.role} className="IValue" />
              </div>
              <div className="Details">
                <Title title="Date of Joining" className="IName" />
                <Title title={userDetails?.dateOfJoining} className="IValue" />
              </div>
              <div className="Details">
                <Title title="Password" className="IName" />
                <Title title={userDetails?.password} className="IValue" />
              </div>
            </div>
          </div>
          <div className="ItemDetails">
            <div className="ItemEdit">
              <Title title="Salary Details" className="ItemDetails" />
              <CustomButton
                text="Edit"
                onClick={EditInventoryDetails}
                className="Edit"
              />
            </div>

            <div className="IDetails">
              <div className="Details">
                <Title title="Account Number" className="IName" />
                <Title
                  title={userDetails?.userSalary?.accountDetails}
                  className="IValue"
                />
              </div>
              <div className="Details">
                <Title title="Bank Name" className="IName" />
                <Title
                  title={userDetails?.userSalary?.bankName}
                  className="IValue"
                />
              </div>
              <div className="Details">
                <Title title="Ifsc Code" className="IName" />
                <Title
                  title={userDetails?.userSalary?.ifscCode}
                  className="IValue"
                />
              </div>
              <div className="Details">
                <Title title="PAN Card" className="IName" />
                <Title
                  title={userDetails?.userSalary?.panCardNumber}
                  className="IValue"
                />
              </div>
              <div className="Details">
                <Title title="Aadhar Card" className="IName" />
                <Title
                  title={userDetails?.userSalary?.aadharCardNumber}
                  className="IValue"
                />
              </div>
            </div>
          </div>
          <div className="ItemDetails">
            <div className="ItemEdit">
              <Title title="Documents" className="ItemDetails" />
            </div>

            <div className="IDetails">
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
        </>
      )}
      <CustomModal
        className="EditItem"
        visible={editItem}
        onCancel={onCancel}
        closeOnPress={onCancel}
        children={
          <div className="Details">
            <Title title="Basic Details" className="AccountDetails" />
            <Form
              name="basic"
              initialValues={{ remember: true }}
              //   onFinish={onFinish}
              //   onFinishFailed={onFinishFailed}
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
                        defaultValue={userDetails?.firstName}
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
                      {/* {console.log("username", userDetails?.lastName)} */}
                      <Input
                        onChange={(e) => setLastName(e?.target?.value)}
                        placeholder="Enter Last Name"
                        defaultValue={userDetails?.lastName}
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
                        defaultValue={userDetails?.emailAddress}
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
                        defaultValue={userDetails?.mobileNumber}
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
                        style={{ width: "100%" }}
                        defaultValue={dayjs(userDetails?.dateOfBirth)}
                        onChange={dateOnChange}
                        // className="datePicker"
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
                        defaultValue={userDetails?.gender}
                      >
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
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
                        defaultValue={userDetails?.emergencyContactName}
                        onChange={(e) => setContactName(e?.target?.value)}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Emergency contact number"
                      name="number"
                      rules={[
                        {
                          required: false,
                          message: "Please input your emergency number!",
                        },
                      ]}
                    >
                      {/* <div className="WeightField"> */}
                      <Input
                        placeholder="Enter emergency contact no"
                        className="weightInput"
                        defaultValue={userDetails?.emergencyContactNumber}
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
              <div className="Buttons">
                <CustomButton
                  text="Cancel"
                  className="Reject"
                  // onClick={onCancel}
                />
                <CustomButton
                  text="Save"
                  className="Approve"
                  onClick={modifyBasicDetails}
                />
              </div>
            </Form>
          </div>
        }
      />
      <CustomModal
        className="EditItem"
        visible={editSales}
        onCancel={onCancel}
        closeOnPress={onCancel}
        children={
          <div className="SalesContainer">
            <Title title="Employment Details" className="AccountDetails" />
            <Form
              name="basic"
              labelCol={{ span: 24 }}
              initialValues={{ remember: true }}
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
                    defaultValue={userDetails?.role}
                    onChange={(val) => setRole(val)}
                    allowClear
                  >
                    <Option value="male">Indian Bank</Option>
                    <Option value="female">HDFC Bank</Option>
                    <Option value="other">other</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="DatePicker"
                  name="date"
                  rules={[
                    { required: true, message: "Please select joining date!" },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    defaultValue={dayjs(userDetails?.dateOfJoining)}
                    onChange={(date,dateString) => setDateOfJoining(dateString)}
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
                    defaultValue={userDetails?.password}
                    onChange={(e) => setPassword(e?.target?.value)}
                  />
                </Form.Item>
              </div>
              <div className="Buttons">
                <CustomButton
                  text="Cancel"
                  className="Reject"
                  // onClick={onCancel}
                />
                <CustomButton
                  text="Save"
                  className="Approve"
                  onClick={modifyRoleDetails}
                />
              </div>
            </Form>
          </div>
        }
      />
      <CustomModal
        className="EditItem"
        visible={editInventory}
        onCancel={onCancel}
        closeOnPress={onCancel}
        children={
          <div className="SalesContainer">
            <Title title="Salary Details" className="AccountDetails" />
            <Form
              name="basic"
              labelCol={{ span: 24 }}
              initialValues={{ remember: true }}
              //   onFinish={onFinish}
              //   onFinishFailed={onFinishFailed}
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
                  <Input placeholder="Enter account number" />
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
                    onChange={onGenderChange}
                    allowClear
                  >
                    <Option value="male">Indian Bank</Option>
                    <Option value="female">HDFC Bank</Option>
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
                  <Input placeholder="Enter IFSC Code" />
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
                  <Input placeholder="Enter salary (INR)" />
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
                  <Input placeholder="Enter pan number" />
                </Form.Item>
                <Form.Item
                  label="Aadhar Number"
                  name="Quantity"
                  rules={[
                    {
                      required: true,
                      message: "Please input your aadhar number!",
                    },
                  ]}
                >
                  <Input placeholder="Enter aadhar number" />
                </Form.Item>
              </div>
            </Form>
          </div>
        }
      />
      <CustomModal
        className="EditItem"
        visible={editPurchase}
        onCancel={onCancel}
        closeOnPress={onCancel}
        children={
          <div className="SalesContainer">
            <Title title="Purchase Details" className="AccountDetails" />
            <Form
              name="basic"
              labelCol={{ span: 24 }}
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <div className="salesDetails">
                <Form.Item
                  label="Cost Per Unit"
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: "Please input your price in unit!",
                    },
                  ]}
                >
                  <Input placeholder="Enter cost per unit" />
                </Form.Item>
                <Form.Item
                  label="Vendor"
                  name="type"
                  rules={[
                    { required: true, message: "Please select your vendor!" },
                  ]}
                >
                  <Select
                    placeholder="Select Vendor"
                    className="vendor"
                    onChange={onGenderChange}
                    allowClear
                  >
                    <Option value="male">Indian Bank</Option>
                    <Option value="female">HDFC Bank</Option>
                    <Option value="other">other</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Min. Sales order quantity"
                  name="minsales"
                  rules={[
                    {
                      required: true,
                      message: "Please input your min order quantity!",
                    },
                  ]}
                >
                  <Input placeholder="Enter min order quantity" />
                </Form.Item>
              </div>
              <div className="salesDetails">
                <Form.Item
                  label="Max. Sales Order Quantity"
                  name="quantity"
                  rules={[
                    {
                      required: true,
                      message: "Please input your max. quantity!",
                    },
                  ]}
                >
                  <Input placeholder="Enter max sales order quantity" />
                </Form.Item>
              </div>
            </Form>
            <div className="Buttons">
              <CustomButton
                text="Cancel"
                className="Reject"
                // onClick={() => onCancel()}
              />
              <CustomButton
                text="Save"
                className="Approve"
                // onClick={validateCredentials}
              />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default EditUser;
