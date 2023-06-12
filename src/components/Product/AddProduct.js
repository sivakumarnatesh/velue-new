import React, { useState } from "react";
import DetailsTop from "../Orders/DetailsTop";
import "./Product.scss";
import Title from "../../sharedComponents/Title/Title";
import { Form, Input, InputNumber, Popconfirm, Select, Typography, Upload, message } from "antd";
import { InboxOutlined, MoreOutlined } from "@ant-design/icons";
import AntdTable from "../../sharedComponents/AntdTable/AntdTable";
import PopOver from "../../sharedComponents/PopOver/PopOver";
import CustomButton from "../../sharedComponents/Buttons/CustomButton";

function AddProduct() {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [itemDetails, setItemDetails] = useState({});
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
  
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
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
    <div className="AddProduct">
      <DetailsTop AddProduct={true} />
      <div className="Details">
        <Title title="Item Details" className="AccountDetails" />
        <Form
          name="basic"
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
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
                    { required: false, message: "Please input your Model!" },
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
                    <Input placeholder="Enter weight" className="weightInput" />
                    <Select
                      placeholder="Kg"
                      className="weightDropdown"
                      onChange={onGenderChange}
                      allowClear
                    >
                      <Option value="Gram">Gram</Option>
                      <Option value="Kg">Kg</Option>
                      {/* <Option value="other">other</Option> */}
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
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
      </div>
      <div className="SalesContainer">
        <Title title="Sales Details" className="AccountDetails" />
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="salesDetails">
          <Form.Item
              label="Packaging Type"
              name="type"
              rules={[
                { required: true, message: "Please input your package type!" },
              ]}
            >
              <Select
                placeholder="Select Packaging Type"
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
              label="Number of units per packaging"
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
           
            <Form.Item
              label="Packaging price"
              name="units"
              rules={[{ required: true, message: "Please input your units!" }]}
            >
              <Input placeholder="Enter units per sales type" />
            </Form.Item>
            
          </div>
          {/* <div className="salesDetails sBtn">
          <CustomButton text='+ Add Sales Package' onClick={handleAdd} className='SalesPackage' />
          </div> */}
          <div className="salesDetails">
            <Form.Item
              label="Minimum Order Quantity"
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
              label="Maximum Order Quantity"
              name="Quantity"
              rules={[
                { required: true, message: "Please input your max. Quantity!" },
              ]}
            >
              <Input placeholder="Enter max order quantity" />
            </Form.Item>
          {/* <Form form={form} component={false}>
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
            </Form> */}
          </div>
        </Form>
      </div>
      <div className="SalesContainer">
        <Title title="Inventory Details" className="AccountDetails" />
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
      </div>
      <div className="SalesContainer">
        <Title title="Purchase Details" className="AccountDetails" />
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
      </div>
    </div>
  );
}

export default AddProduct;
