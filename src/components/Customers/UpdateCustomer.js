import React, { useState } from "react";
import DetailsTop from "../Orders/DetailsTop";
import "./Customer.scss";
import Title from "../../sharedComponents/Title/Title";
import CustomButton from "../../sharedComponents/Buttons/CustomButton";
import DetailsCenter from "../Orders/DetailsCenter";
import { Form, Input, Select, Upload } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import CustomModal from "../../sharedComponents/Modal/CustomModal";
import { useLocation } from "react-router-dom";

const UpdateCustomer = () => {
  const [editBusinessItem, setEditBusinessItem] = useState(false);
  const [editAccountItem, setEditAccountItem] = useState(false);

  const location = useLocation();

  console.log('loo',location?.state?.customerDetails);

  const { Option } = Select;

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

  return (
    <div className="UpdateCustomer">
      <DetailsTop EditCustomer={true} customerName={location?.state?.customerDetails?.customerName} gstno={location?.state?.customerDetails?.gstno} />

      <div className="ItemDetails">
        <div className="ItemEdit">
          <Title title="Business Details" className="ItemDetails" />
          <CustomButton
            text="Edit"
            onClick={EditBusinessDetails}
            className="Edit"
          />
        </div>

        <DetailsCenter EditCustomer={true} customerDetails={location?.state?.customerDetails} />
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
            <Title title={location?.state?.customerDetails?.customerBank?.accountNumber} className="IValue" />
          </div>
          <div className="Details">
            <Title title="Bank Name" className="IName" />
            <Title title={location?.state?.customerDetails?.customerBank?.bankName} className="IValue" />
          </div>
          <div className="Details">
            <Title title="IFSC Code" className="IName" />
            <Title title={location?.state?.customerDetails?.customerBank?.ifscCode} className="IValue" />
          </div>
          <div className="Details">
            <Title title="PAN" className="IName" />
            <Title title={location?.state?.customerDetails?.customerBank?.panCard} className="IValue" />
          </div>

          <div className="Details">
            <Title title="Max. Sales order Quantity" className="IName" />
            <Title title="100 Pkt" className="IValue" />
          </div>
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
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
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
                    // onChange={onChange}
                    // onFocus={onFocus}
                    // onBlur={onBlur}
                    // onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                  </Select>

                  <Title
                    title="Date Registered: 12 Jan 2023"
                    className="Name"
                  />
                </Form.Item>

                <Form.Item
                  // label="Contact Name"
                  name="contactname"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Full name!",
                    },
                  ]}
                >
                  <Title title="Mittal Hardwares" className="Hardware" />
                  <Title title="Ahammed Nazar" className="Name" />
                  <div className="Address">
                    Site No. 05 , Opposite to JVM Garden Apartment Building,
                    Bangalore 560081
                  </div>
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
                  <Input placeholder="Enter Full name" />
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
                  <Input placeholder="Enter Primary Number" />
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
                  <Input placeholder="Enter Whatsapp Number" />
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
                  <Input placeholder="Enter your email address" />
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
                  <Input placeholder="Enter credit amount" />
                </Form.Item>
                <Form.Item
                  name="limitdays"
                  label="Credit Limit Days"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select Day Limit"
                    style={{ width: 250 }}
                    // onChange={onGenderChange}
                    allowClear
                  >
                    <Option value="male">Indian Bank</Option>
                    <Option value="female">HDFC Bank</Option>
                    <Option value="other">other</Option>
                  </Select>
                </Form.Item>
              </div>
            </Form>
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
                <Input placeholder="Enter Account Number" />
              </Form.Item>
              <Form.Item
                name="bankname"
                label="Bank Name"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select Bank"
                  className="BankName"
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
                <Input placeholder="Enter Ifsc Code" />
              </Form.Item>
              <Form.Item
                label="Pan Card Number"
                name="panno"
                rules={[
                  { required: true, message: "Please input your PAN number!" },
                ]}
              >
                <Input placeholder="Enter PAN Number" />
              </Form.Item>
            </div>
          </Form>
        </div>
        }
      />
    </div>
  );
};

export default UpdateCustomer;
