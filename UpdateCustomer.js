import React, { useState } from "react";
import DetailsTop from "../Orders/DetailsTop";
import "./Customer.scss";
import Title from "../../sharedComponents/Title/Title";
import CustomButton from "../../sharedComponents/Buttons/CustomButton";
import { Form, Input, Select, Upload, message } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import CustomModal from "../../sharedComponents/Modal/CustomModal";
import { useLocation, useNavigate } from "react-router-dom";
import DetailsCenter from "./DetailsCenter";
import { BASE_URL, EDIT_CUSTOMER } from "../../utils/API/EndPoint";
import { PUTAPI } from "../../utils/API";
import { STATUS_CODE } from "../../utils/Variables/DefaultData";
import { AdminScreens } from "../../utils/Routing/RoutePath";
import { useEffect } from "react";

const UpdateCustomer = () => {
  const [editBusinessItem, setEditBusinessItem] = useState(false);
  const [editAccountItem, setEditAccountItem] = useState(false);
  const [gstNo, setGstNo] = useState("");
  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [primaryNumber, setPrimaryNumber] = useState("");
  const [whatsappNo, setWhatsappNo] = useState("");
  const [creditLimit, setCreditLimit] = useState("");
  const [days, setDays] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [panCard, setPanCard] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const { Option } = Select;

  useEffect(() => {
    setGstNo(location?.state?.customerDetails?.gstno ?? "");
    setName(location?.state?.customerDetails?.contactName ?? "");
    setGmail(location?.state?.customerDetails?.contactGmail ?? "");
    setPrimaryNumber(location?.state?.customerDetails?.primaryNumber ?? "");
    setWhatsappNo(location?.state?.customerDetails?.whatsAppNumber ?? "");
    setCreditLimit(location?.state?.customerDetails?.creditLimitAmount ?? "");
    setDays(location?.state?.customerDetails?.creditLimitDays ?? "");
    setCustomerName(location?.state?.customerDetails?.customerName ?? "");
    setAccountNo(location?.state?.customerDetails?.accountNumber ?? "");
    setBankName(location?.state?.customerDetails?.bankName ?? "");
    setIfscCode(location?.state?.customerDetails?.ifscCode ?? "");
    setPanCard(location?.state?.customerDetails?.panCard ?? "");
  }, []);

  const EditBusinessDetails = () => {
    setEditBusinessItem(true);
  };

  const EditAccountDetails = () => {
    setEditAccountItem(true);
  };

  const onCancel = () => {
    setEditBusinessItem(false);
    setEditAccountItem(false);
  };

  const handleGstno = (val) => {
    setGstNo(val);
  };
  console.log(location?.state?.customerDetails);
  const updateCustomer = () => {
    const payload = {
      customerId: location?.state?.customerDetails?.customerId,
      customerName: customerName,
      contactName: name,
      primaryNumber: primaryNumber,
      whatsAppNumber: whatsappNo,
      contactGmail: gmail,
      creditLimitAmount: 600000,
      creditLimitDays: days,
      outstandingLimit: creditLimit,
      // overdue: 0,
      gstno: gstNo,
      // createdAt: null,
      // updatedAt: null,
      bankReferenceId: 2,
      customerBank: {
        // bankReferenceId": 18,
        accountNumber: accountNo,
        bankName: bankName,
        ifscCode: ifscCode,
        panCard: panCard,
      },
    };
    console.log("payload", payload);
    PUTAPI(
      `${BASE_URL}${EDIT_CUSTOMER}/${location?.state?.customerDetails?.customerId}`,
      payload
    )
      .then((res) => {
        console.log("res", res);
        if (
          res?.status === STATUS_CODE?.SUCCESS_CODE ||
          res?.status === STATUS_CODE?.SUCCESS_CODE_1
        ) {
          onCancel();
          // FindLoader(false);
          message.success("Customer details updated successfully.");
          navigate(AdminScreens?.customers);
          // fetch();
        }
      })
      .catch((err) => {
        console.log("err", err);
        // FindLoader(false);
        message.error(err.message);
      });
  };
  return (
    <div className="UpdateCustomer">
      <DetailsTop
        EditCustomer={true}
        customerName={location?.state?.customerDetails?.customerName}
        gstno={location?.state?.customerDetails?.gstno}
      />

      <div className="ItemDetails">
        <div className="ItemEdit">
          <Title title="Business Details" className="ItemDetails" />
          <CustomButton
            text="Edit"
            onClick={EditBusinessDetails}
            className="Edit"
          />
        </div>

        <DetailsCenter
          EditCustomer={true}
          customerDetails={location?.state?.customerDetails}
        />
      </div>
      <div className="ItemDetails">
        <div className="ItemEdit">
          <Title title="Account Details" className="ItemDetails" />
          <CustomButton
            text="Edit"
            onClick={EditAccountDetails}
            className="Edit"
          />
        </div>

        <div className="IDetails">
          <div className="Details">
            <Title title="Account Number" className="IName" />
            <Title
              title={
                location?.state?.customerDetails?.customerBank?.accountNumber
              }
              className="IValue"
            />
          </div>
          <div className="Details">
            <Title title="Bank Name" className="IName" />
            <Title
              title={location?.state?.customerDetails?.customerBank?.bankName}
              className="IValue"
            />
          </div>
          <div className="Details">
            <Title title="IFSC Code" className="IName" />
            <Title
              title={location?.state?.customerDetails?.customerBank?.ifscCode}
              className="IValue"
            />
          </div>
          <div className="Details">
            <Title title="PAN" className="IName" />
            <Title
              title={location?.state?.customerDetails?.customerBank?.panCard}
              className="IValue"
            />
          </div>

          {/* <div className="Details">
            <Title title="Max. Sales order Quantity" className="IName" />
            <Title title="100 Pkt" className="IValue" />
          </div> */}
        </div>
      </div>
      <div className="ItemDetails">
        <div className="ItemEdit">
          <Title title="Documents" className="ItemDetails" />
          {/* <CustomButton
            text="Edit"
            // onClick={EditSalesDetails}
            className="Edit"
          /> */}
        </div>

        <div className="IDetails">
          <div className="Details">
            <Title title="Sales price per unit" className="IName" />
          </div>
          <div className="Upload">
            <Form
              name="validate_other"
              // onFinish={onFinishUpload}
              // style={{ maxWidth: 600 }}
            >
              <div className="UploadFiles">
                {/* <Form.Item > */}
                <div className="GSTFile">
                  <div className="FileTitle">GST Certificate</div>
                  <div>
                    <Form.Item
                      name="dragger"
                      label="GST Certificate"
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
      <CustomModal
        className="EditBusinessItem"
        visible={editBusinessItem}
        onCancel={onCancel}
        closeOnPress={onCancel}
        children={
          <div className="Details">
            <Title title="Business Details" className="AccountDetails" />
            <Form
              name="basic"
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <div className="Account1">
                <Form.Item
                  label="GST Number"
                  name="gst"
                  rules={[
                    {
                      required: true,
                      message: "Please input your GST Number!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    style={{ width: 250 }}
                    placeholder="Search GST Number"
                    optionFilterProp="children"
                    defaultValue={location?.state?.customerDetails?.gstno}
                    onChange={handleGstno}
                    // onFocus={onFocus}
                    // onBlur={onBlur}
                    // onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="27AAPFU0939F1ZV">27AAPFU0939F1ZV</Option>
                  </Select>
                  {/* 
                  <Title
                    title="Date Registered: 12 Jan 2023"
                    className="Name"
                  /> */}
                </Form.Item>

                <Form.Item
                  label="Customer Name"
                  name="customername"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Full name!",
                    },
                  ]}
                >
                  {/* <Title title="Mittal Hardwares" className="Hardware" /> */}
                  {/* <Title title="Ahammed Nazar" className="Name" /> */}
                  <Input
                    placeholder="Enter Customer Name"
                    defaultValue={
                      location?.state?.customerDetails?.customerName
                    }
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                  {/*<div className="Address">
                    Site No. 05 , Opposite to JVM Garden Apartment Building,
                    Bangalore 560081
                  </div> */}
                </Form.Item>
              </div>
              <div className="Account1">
                <Form.Item
                  label="Contact Name"
                  name="contactname"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Full name!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Full name"
                    defaultValue={location?.state?.customerDetails?.contactName}
                    onChange={(e) => setName(e?.target?.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Primary Number"
                  name="primary"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Primary number!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Primary Number"
                    defaultValue={
                      location?.state?.customerDetails?.primaryNumber
                    }
                    onChange={(e) => setPrimaryNumber(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Whatsapp Number"
                  name="ifsc"
                  rules={[
                    {
                      required: false,
                      message: "Please input your Whatsapp Number!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Whatsapp Number"
                    defaultValue={
                      location?.state?.customerDetails?.whatsAppNumber
                    }
                    onChange={(e) => setWhatsappNo(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className="Account2">
                <Form.Item
                  label="Contact Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Contact mail!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your email address"
                    defaultValue={
                      location?.state?.customerDetails?.contactGmail
                    }
                    onChange={(e) => setGmail(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Credit Limit Amount"
                  name="credit"
                  rules={[
                    {
                      required: true,
                      message: "Please input your credit limit amount !",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter credit amount"
                    defaultValue={
                      location?.state?.customerDetails?.creditLimitAmount
                    }
                    onChange={(e) => setCreditLimit(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="limitdays"
                  label="Credit Limit Days"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select Day Limit"
                    style={{ width: 250 }}
                    onChange={(val) => setDays(val)}
                    defaultValue={
                      location?.state?.customerDetails?.creditLimitDays
                    }
                    allowClear
                  >
                    <Option value="20">20</Option>
                    <Option value="30">30</Option>
                    <Option value="40">40</Option>
                  </Select>
                </Form.Item>
              </div>
            </Form>
            <div className="Buttons">
              <CustomButton
                text="Cancel"
                className="Reject"
                onClick={() => onCancel()}
              />
              <CustomButton
                text="Save"
                className="Approve"
                onClick={() => updateCustomer()}
              />
            </div>
          </div>
        }
      />
      <CustomModal
        className="EditBusinessItem"
        visible={editAccountItem}
        onCancel={onCancel}
        closeOnPress={onCancel}
        children={
          <div className="Details">
            <Title title="Account Details" className="AccountDetails" />
            <Form
              name="basic"
              initialValues={{ remember: true }}
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div className="Account1">
                <Form.Item
                  label="Account Number"
                  name="accountno"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Account number!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter Account Number"
                    defaultValue={
                      location?.state?.customerDetails?.customerBank
                        ?.accountNumber
                    }
                    onChange={(e) => setAccountNo(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="bankname"
                  label="Bank Name"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select Bank"
                    className="BankName"
                    defaultValue={
                      location?.state?.customerDetails?.customerBank?.bankName
                    }
                    onChange={(e) => setBankName(e.target.value)}
                    // onChange={onGenderChange}
                    allowClear
                  >
                    <Option value="male">Indian Bank</Option>
                    <Option value="female">HDFC Bank</Option>
                    <Option value="other">other</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="Account2">
                <Form.Item
                  label="IFSC Code"
                  name="ifsc"
                  rules={[
                    { required: true, message: "Please input your IFSC Code!" },
                  ]}
                >
                  <Input
                    placeholder="Enter Ifsc Code"
                    defaultValue={
                      location?.state?.customerDetails?.customerBank?.ifscCode
                    }
                    onChange={(e) => setIfscCode(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Pan Card Number"
                  name="panno"
                  rules={[
                    {
                      required: true,
                      message: "Please input your PAN number!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter PAN Number"
                    defaultValue={
                      location?.state?.customerDetails?.customerBank?.panCard
                    }
                    onChange={(e) => setPanCard(e.target.value)}
                  />
                </Form.Item>
              </div>
            </Form>
            <div className="Buttons">
              <CustomButton
                text="Cancel"
                className="Reject"
                onClick={() => onCancel()}
              />
              <CustomButton
                text="Save"
                className="Approve"
                onClick={() => updateCustomer()}
                // onClick={() =>
                //   validateCredentials(location?.state?.productDetail)
                // }
              />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default UpdateCustomer;
