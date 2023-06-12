import React, { useState } from "react";
import "./Product.scss";
import UpdateProduct from "./UpdateProduct";
import Title from "../../sharedComponents/Title/Title";
import CustomButton from "../../sharedComponents/Buttons/CustomButton";
import { Form, Input, InputNumber, Popconfirm, Select, Typography, Upload, message } from "antd";
import ImgCrop from "antd-img-crop";
import {
  LoadingOutlined,
  PlusOutlined,
  InboxOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import CustomModal from "../../sharedComponents/Modal/CustomModal";
import { Images } from "../../assets/Images/Images";
import AntdTable from "../../sharedComponents/AntdTable/AntdTable";
import PopOver from "../../sharedComponents/PopOver/PopOver";

const ProductDetails = () => {
  const [fileList, setFileList] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [editItem, setEditItem] = useState(false);
  const [editSales, setEditSales] = useState(false);
  const [editInventory, setEditInventory] = useState(false);
  const [editPurchase, setEditPurchase] = useState(false);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const [dataSource,setDataSource] = useState([{
    key: 1,
    salesType: "Laskhmi Enterprises",
    Units: "250000",
    Min: "5000",
    Max: "Pcs",
 
  },])

  const [count,setCount] = useState(dataSource.length);

  const { Option } = Select;
  const [form] = Form.useForm();

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
  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = (await form.validateFields());

      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setDataSource(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setDataSource(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const edit = (record) => {
    form.setFieldsValue({ salesType: '', Units: '', Min: '',Max:'', ...record });
    setEditingKey(record.key);
  };
  const assignContentData = (row) => {
    let result = [];
    if (true) {
      const val = {
        text: "Edit",
        onClick: () => edit(row),
      };
      result = [...result, val];
    }
    console.log('row',row?.key)
    if (true) {
      const val = {
        text: "Delete",
        onClick: () => handleDelete(row?.key),
      };
      result = [...result, val];
    }
    return result;
  };
  const columns = [
    {
      title: 'Sales Type',
      dataIndex: 'salesType',
      editable: true,
    },
    {
      title: 'Units Per Sales Type',
      dataIndex: 'Units',
      editable: true,
    },
    {
      title: 'Min. Order Quantity',
      dataIndex: 'Min',
      editable: true,
    },
    {
      title: 'Max. Order Quantity',
      dataIndex: 'Max',
      editable: true,
    },
    {
      title: '',
      dataIndex:'',
      render: (row) => {
        const contentData = assignContentData(row);
        const editable = isEditing(row);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(row.key)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <PopOver
            getPopupContainer={(triggerNode) => triggerNode}
            content={contentData}
            children={<MoreOutlined className="dotIcon" />}
          />
        );
      },
    }
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const handleAdd = () => {
    const newData = {
      key: count,
      salesType: `Edward King ${count}`,
      Units: '32',
      Min: `London, Park Lane no. ${count}`,
      Max: '895',
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  return (
    <div className="ProductDetail">
      <UpdateProduct />
      <div className="ItemDetails">
        <div className="ItemEdit">
          <Title title="Item Details" className="ItemDetails" />
          <CustomButton
            text="Edit"
            onClick={EditItemDetails}
            className="Edit"
          />
        </div>
        <div className="ImageUploadDetails">
          <div className="IDetails">
            <div className="Details">
              <Title title="Product" className="IName" />
              <Title title="Health Faucet" className="IValue" />
            </div>
            <div className="Details">
              <Title title="Model" className="IName" />
              <Title title="Blues" className="IValue" />
            </div>
            <div className="Details">
              <Title title="Code" className="IName" />
              <Title title="V150" className="IValue" />
            </div>
            <div className="Details">
              <Title title="Category" className="IName" />
              <Title title="Faucet" className="IValue" />
            </div>
            <div className="Details">
              <Title title="Group Code" className="IName" />
              <Title title="139971" className="IValue" />
            </div>
            <div className="Details">
              <Title title="Unit" className="IName" />
              <Title title="Pcs" className="IValue" />
            </div>
            <div className="Details">
              <Title title="Brand" className="IName" />
              <Title title="Velue" className="IValue" />
            </div>
            <div className="Details">
              <Title title="Weight" className="IName" />
              <Title title="250 Grams" className="IValue" />
            </div>
            <div className="Details">
              <Title title="HSN Code" className="IName" />
              <Title title="543488796" className="IValue" />
            </div>
            <div className="Details">
              <Title title="Description" className="IName" />
              <Title
                title="HF Royal set one mtr shower tube and wall mounted Hook HF Royal set one mtr shower tube and wall mounted Hook"
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
          <Title title="Sales Details" className="ItemDetails" />
          <CustomButton
            text="Edit"
            onClick={EditSalesDetails}
            className="Edit"
          />
        </div>

        <div className="IDetails">
          <div className="Details">
            <Title title="Sales price per unit" className="IName" />
            <Title title="550" className="IValue" />
          </div>
          <div className="Details">
            <Title title="Sales Type" className="IName" />
            <Title title="Packet" className="IValue" />
          </div>
          <div className="Details">
            <Title title="No. of unit per sales Type" className="IName" />
            <Title title="10 Pcs" className="IValue" />
          </div>
          <div className="Details">
            <Title title="Min. Sales order Quantity" className="IName" />
            <Title title="2 Pkt" className="IValue" />
          </div>

          <div className="Details">
            <Title title="Max. Sales order Quantity" className="IName" />
            <Title title="100 Pkt" className="IValue" />
          </div>
        </div>
      </div>
      <div className="ItemDetails">
        <div className="ItemEdit">
          <Title title="Inventory Details" className="ItemDetails" />
          <CustomButton
            text="Edit"
            onClick={EditInventoryDetails}
            className="Edit"
          />
        </div>

        <div className="IDetails">
          <div className="Details">
            <Title title="Min Quantity Thresholds" className="IName" />
            <Title title="10000 Pcs" className="IValue" />
          </div>
        </div>
      </div>
      <div className="ItemDetails">
        <div className="ItemEdit">
          <Title title="Purchase Details" className="ItemDetails" />
          <CustomButton
            text="Edit"
            onClick={EditPurchaseDetails}
            className="Edit"
          />
        </div>

        <div className="IDetails">
          <div className="Details">
            <Title title="Purchase Price" className="IName" />
            <Title title="550" className="IValue" />
          </div>
          <div className="Details">
            <Title title="Min. Purchase order Quantity" className="IName" />
            <Title title="100 pcs" className="IValue" />
          </div>
          <div className="Details">
            <Title title="Max. Purchase order Quantity" className="IName" />
            <Title title="100 Pcs" className="IValue" />
          </div>
        </div>
      </div>
      <CustomModal
        visible={showDetails}
        onCancel={onCancel}
        closeOnPress={onCancel}
        className="ViewProduct"
      >
        <Title title="Product Details" className="ProductImageDetails" />
        <img src={Images.bg} className="ProductImageView" alt="Product" />
        <Title title="About the Item" className="ProductImageDetails" />
        <ul>
          <li>
            ABS Body: This health faucet is made of heavy-duty ABS which is leak
            free, resist to high pressure, and avoid blasting{" "}
          </li>
          <li>1 Year warranty</li>
          <li>
            Flexible: This hand-held bidet product is small and flexible that
            you can freely adjust the direction.
          </li>
          <li>
            {" "}
            High performance: Tested for superior performance in low water
            pressure and poor water quality conditions as screen washer prevent
            clogging.
          </li>
          <li>
            {" "}
            Wall Mounting Hook: Designed with your modern bath in mind the
            faucet can be hung on the wall when not in use. Lifelong delivers a
            quality finish for a quality product you deserve.
          </li>
          <li>
            {" "}
            Durable: Stainless steel with chrome finishes and anti-corrosion,
            adding style, quality and durability.
          </li>
        </ul>
      </CustomModal>
      <CustomModal
        className="EditItem"
        visible={editItem}
        onCancel={onCancel}
        closeOnPress={onCancel}
        children={
          <div className="Details">
            <Title title="Item Details" className="AccountDetails" />
            <Form
              name="basic"
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <div className="FieldUpload">
                <div>
                  <div className="Account1">
                    <Form.Item
                      label="Product"
                      name="product"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Product!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter product name" />
                    </Form.Item>
                    <Form.Item
                      label="Model"
                      name="model"
                      rules={[
                        {
                          required: false,
                          message: "Please input your Model!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter model" />
                    </Form.Item>
                  </div>
                  <div className="Account2">
                    <Form.Item
                      label="Code"
                      name="code"
                      rules={[
                        { required: true, message: "Please input your code!" },
                      ]}
                    >
                      <Input placeholder="Enter code" />
                    </Form.Item>
                    <Form.Item
                      name="category"
                      label="Category"
                      rules={[{ required: false }]}
                    >
                      <Select
                        placeholder="Select Category"
                        onChange={onGenderChange}
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
                      name="groupcode"
                      label="Group code"
                      rules={[{ required: false }]}
                    >
                      <Select
                        placeholder="Select code"
                        onChange={onGenderChange}
                        allowClear
                      >
                        <Option value="male">Indian Bank</Option>
                        <Option value="female">HDFC Bank</Option>
                        <Option value="other">other</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="unit"
                      label="Unit"
                      rules={[{ required: false }]}
                    >
                      <Select
                        placeholder="Select unit"
                        onChange={onGenderChange}
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
                      name="brand"
                      label="Brand"
                      rules={[{ required: false }]}
                    >
                      <Select
                        placeholder="Select Brand"
                        onChange={onGenderChange}
                        allowClear
                      >
                        <Option value="male">Indian Bank</Option>
                        <Option value="female">HDFC Bank</Option>
                        <Option value="other">other</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="Weight"
                      name="weight"
                      rules={[
                        {
                          required: false,
                          message: "Please input your weight!",
                        },
                      ]}
                    >
                      <div className="WeightField">
                        <Input
                          placeholder="Enter weight"
                          className="weightInput"
                        />
                        <Select
                          placeholder="Kg"
                          className="weightDropdown"
                          onChange={onGenderChange}
                          allowClear
                        >
                          <Option value="Gram">Gram</Option>
                          <Option value="Kg">Kg</Option>
                        </Select>
                      </div>
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
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <div className="ProductDescription">
                <Title title="Description" />
                <Form.Item
                  name="description"
                  rules={[
                    {
                      required: false,
                      message: "Please input your description!",
                    },
                  ]}
                >
                  <Input.TextArea placeholder="Enter product description" />
                </Form.Item>
              </div>
              <div className="ProductDescription">
                <Title title="About the Item" />
                <Form.Item
                  name="description"
                  rules={[
                    {
                      required: false,
                      message: "Please input your description!",
                    },
                  ]}
                >
                  <Input.TextArea placeholder="Enter product description" />
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
      <CustomModal
        className="EditItem"
        visible={editSales}
        onCancel={onCancel}
        closeOnPress={onCancel}
        children={
          <div className="SalesContainer">
            <Title title="Sales Details" className="AccountDetails" />
            <Form
              name="basic"
              labelCol={{ span: 24 }}
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <div className="salesDetails">
                <Form.Item
                  label="Sales price per unit"
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: "Please input your price in INR!",
                    },
                  ]}
                >
                  <Input placeholder="Enter product price in INR" />
                </Form.Item>
                {/* <Form.Item
                  label="Sales Type"
                  name="type"
                  rules={[
                    {
                      required: true,
                      message: "Please input your sales type!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Category"
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
                  label="Number of Units Per Sales Type"
                  name="units"
                  rules={[
                    { required: true, message: "Please input your units!" },
                  ]}
                >
                  <Input placeholder="Enter units per sales type" />
                </Form.Item> */}
              </div>
              <div className="sBtn">
                <CustomButton
                  text="+ Add Sales Package"
                  onClick={handleAdd}
                  className="SalesPackage"
                />
              </div>
              <div className="salesDetailsTable">
                {/* <Form.Item
                  label="Min. Sales Order Quantity"
                  name="quantity"
                  rules={[
                    {
                      required: true,
                      message: "Please input your min. quantity!",
                    },
                  ]}
                >
                  <Input placeholder="Enter min quantity" />
                </Form.Item>
                <Form.Item
                  label="Max. Sales Order Quantity"
                  name="Quantity"
                  rules={[
                    {
                      required: true,
                      message: "Please input your max. Quantity!",
                    },
                  ]}
                >
                  <Input placeholder="Enter max order quantity" />
                </Form.Item> */}
                <Form form={form} component={false}>
                  <AntdTable
                    className="userTable"
                    components={{
                      body: {
                        cell: EditableCell,
                      },
                    }}
                    bordered
                    dataSource={dataSource}
                    columns={mergedColumns}
                    scroll={{ x: true }}
                    limit={6}
                  />
                </Form>
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
      <CustomModal
        className="EditItem"
        visible={editInventory}
        onCancel={onCancel}
        closeOnPress={onCancel}
        children={
          <div className="SalesContainer">
            <Title title="Inventory Details" className="AccountDetails" />
            <Form
              name="basic"
              labelCol={{ span: 24 }}
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <div className="salesDetails">
                <Form.Item
                  label="Min. Stock"
                  name="stock"
                  rules={[
                    {
                      required: true,
                      message: "Please input your min. stock!",
                    },
                  ]}
                >
                  <Input placeholder="Enter min stock quantity" />
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

export default ProductDetails;
