import React from "react";
import CustomerTop from "./CustomerTop";
import "./Customer.scss";
import Title from "../../sharedComponents/Title/Title";
import { Form, Input, Select, Upload, message } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { isStringNotEmpty, validateGST } from "../../utils/Validation/Input";
import { POSTAPI } from "../../utils/API";
import { ADD_CUSTOMER, BASE_URL } from "../../utils/API/EndPoint";
import { STATUS_CODE } from "../../utils/Variables/DefaultData";
import { useNavigate } from "react-router-dom";
import { AdminScreens } from "../../utils/Routing/RoutePath";

function AddCustomer() {
  //Business Details
  const [contactName, setContactName] = useState("");
  const [primaryNumber, setPrimaryNumber] = useState("");
  const [whatsappNo, setWhatsappNo] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [creditAmount, setCreditAmount] = useState("");
  const [creditDays, setCreditDays] = useState("");

  //Account Details
  const [accountNo, setAccountNo] = useState("");
  const [bankName, setBankName] = useState("");
  const [panNo, setPanNo] = useState("");
  const [ifscCode, setIfscCode] = useState("");

  const { Option } = Select;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const validateCredentials = () => {
    // FindLoader(true);
    if (
      isStringNotEmpty(contactName) &&
      isStringNotEmpty(primaryNumber) &&
      isStringNotEmpty(whatsappNo) &&
      isStringNotEmpty(contactEmail) &&
      isStringNotEmpty(creditAmount) &&
      isStringNotEmpty(creditDays) &&
      isStringNotEmpty(accountNo) &&
      isStringNotEmpty(bankName) &&
      isStringNotEmpty(panNo) &&
      isStringNotEmpty(ifscCode)
    ) {
      const payload = {
        // customerId: 18,
        customerName: contactName,
        customerName: contactName,
        primaryNumber: primaryNumber,
        whatsAppNumber: whatsappNo,
        contactGmail: contactEmail,
        creditLimitAmount: creditAmount,
        creditLimitDays: creditDays,
        // gstno: "GST2023002",
        customerBank: {
          // bankReferenceId": 18,
          accountNumber: accountNo,
          bankName: bankName,
          ifscCode: ifscCode,
          panCard: panNo,
        },
      };
      POSTAPI(`${BASE_URL}${ADD_CUSTOMER}`, payload)
        .then((res) => {
          console.log("res", res);
          if (
            res?.status === STATUS_CODE?.SUCCESS_CODE ||
            res?.status === STATUS_CODE?.SUCCESS_CODE_1
          ) {
            onCancel();
            // FindLoader(false);
            message.success("Customer Register Successfully.");
            navigate(AdminScreens?.customers, { state: { fetch: true } });
          }
        })
        .catch((err) => {
          console.log("err", err);
          // FindLoader(false);
          message.error(err.message);
        });
    } else {
      message.error("Enter all mandatory fields!");
    }
  };

  const onCancel = () => {
    console.log('cancel');
    navigate(AdminScreens?.customers);
  }

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const onFinishUpload = (values) => {
    console.log("Received values of form: ", values);
  };
  function onChange(value) {
    console.log(`selected ${value}`);
    
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  return (
    <div className="NewCustomer">
      <CustomerTop newCustomer={true} validateCredentials={validateCredentials} onCancel={onCancel} />
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
                {
                  pattern: validateGST,
                  message: 'Please input valid GST Number'
                }
              ]}
            >
              <Select
                showSearch
                style={{ width: 250 }}
                placeholder="Search GST Number"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="27AAPFU0939F1ZV">27AAPFU0939F1ZV</Option>
              </Select>

              <Title title="Date Registered: 12 Jan 2023" className="Name" />
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
              {/* <div className="Address">
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
                onChange={(e) => setContactName(e?.target?.value)}
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
                onChange={(e) => setPrimaryNumber(e?.target?.value)}
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
                onChange={(e) => setWhatsappNo(e?.target?.value)}
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
                onChange={(e) => setContactEmail(e?.target?.value)}
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
                onChange={(e) => setCreditAmount(e?.target?.value)}
              />
            </Form.Item>
            <Form.Item
              name="limitdays"
              label="Credit Limit Days"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select Day Limit"
                onChange={(val) => setCreditDays(val)}
                allowClear
              >
                <Option value="45">45</Option>
                <Option value="55">55</Option>
                <Option value="65">65</Option>
              </Select>
            </Form.Item>
          </div>
        </Form>
      </div>
      <div className="Details">
        <Title title="Account Details" className="AccountDetails" />
        <Form
          name="basic"
          initialValues={{ remember: true }}
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
                onChange={(e) => setAccountNo(e?.target?.value)}
              />
            </Form.Item>
            <Form.Item
              name="bankname"
              label="Bank Name"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select Bank"
                onChange={(val) => setBankName(val)}
                allowClear
              >
                <Option value="indianbank">Indian Bank</Option>
                <Option value="hdfcbank">HDFC Bank</Option>
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
                onChange={(e) => setIfscCode(e?.target?.value)}
              />
            </Form.Item>
            <Form.Item
              label="Pan Card Number"
              name="panno"
              rules={[
                { required: true, message: "Please input your PAN number!" },
              ]}
            >
              <Input
                placeholder="Enter PAN Number"
                onChange={(e) => setPanNo(e?.target?.value)}
              />
            </Form.Item>
          </div>
        </Form>
      </div>
      <div className="Details">
        <Title title="Documents" className="AccountDetails" />
        <div className="Upload">
          <Form
            name="validate_other"
            onFinish={onFinishUpload}
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
                    getValueFromEvent={normFile}
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
                    getValueFromEvent={normFile}
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
                    getValueFromEvent={normFile}
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

export default AddCustomer;
