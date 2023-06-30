import React, { useState } from "react";
import DetailsTop from "../Orders/DetailsTop";
import "./Product.scss";
import Title from "../../sharedComponents/Title/Title";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Typography,
  Upload,
  message,
} from "antd";
import { InboxOutlined, MoreOutlined } from "@ant-design/icons";
import PopOver from "../../sharedComponents/PopOver/PopOver";
import { AdminScreens } from "../../utils/Routing/RoutePath";
import {
  BASE_URL,
  CREATE_PRODUCT,
  GET_BRANDS,
  GET_CATEGORY,
  GET_PACKAGING,
  GET_UNITS,
} from "../../utils/API/EndPoint";
import { useNavigate } from "react-router-dom";
import { STATUS_CODE } from "../../utils/Variables/DefaultData";
import { GetAPI, POSTAPI } from "../../utils/API";
import { useEffect } from "react";

function AddProduct() {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [itemDetails, setItemDetails] = useState({});
  const [editingKey, setEditingKey] = useState("");
  const [Loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [modelName, setModalName] = useState("");
  const [code, setCode] = useState("");
  const [category, setCategory] = useState("");
  const [categoryType, setCategoryType] = useState([]);
  const [groupCode, setGroupCode] = useState("");
  const [unit, setUnit] = useState([]);
  const [unitVal, setUnitVal] = useState("");
  const [brand, setBrand] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("");
  const [description, setDescription] = useState("");
  const [about, setAbout] = useState("");
  const [packagingType, setPackagingType] = useState([]);
  const [packingType, setPackingType] = useState("");

  const [unitsNo, setUnitsNo] = useState("");
  const [packagingPrice, setPackagingPrice] = useState("");
  const [minOrder, setMinOrder] = useState("");
  const [maxOrder, setMaxOrder] = useState("");
  const [minStock, setMinStock] = useState("");
  const [stockInHand, setStockInHand] = useState("");
  const [imageType,setImageType] = useState("");
  const [imageUrl,setImageUrl] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      salesType: "Laskhmi Enterprises",
      Units: "250000",
      Min: "5000",
      Max: "Pcs",
    },
  ]);

  const [count, setCount] = useState(dataSource.length);
  const [fileList, setFileList] = useState([
   
  ]);

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
  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      // Convert the uploaded file to blob format
      const blob = new Blob([reader.result], { type: file.type });
      // Use the blob as needed (e.g., send it to the server)
      // console.log('blob',blob);
      setImageType(Blob?.type);
      const imageUrl = URL.createObjectURL(blob);
      console.log(imageUrl);
      setImageUrl(imageUrl);
      URL.revokeObjectURL(imageUrl);
    };
    reader.readAsArrayBuffer(file);
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchBrands();
    fetchUnits();
    fetchPackage();
    fetchCategory();
  }, []);

  const fetchBrands = async () => {
    const data = await GetAPI(`${BASE_URL}${GET_BRANDS}`);
    if (
      data?.status === STATUS_CODE?.SUCCESS_CODE ||
      data?.status === STATUS_CODE?.SUCCESS_CODE_1
    ) {
      setBrand(data?.data);
    } else {
      message.error(data);
    }
  };

  const fetchUnits = async () => {
    const data = await GetAPI(`${BASE_URL}${GET_UNITS}`);
    if (
      data?.status === STATUS_CODE?.SUCCESS_CODE ||
      data?.status === STATUS_CODE?.SUCCESS_CODE_1
    ) {
      setUnit(data?.data);
    } else {
      message.error(data);
    }
  };

  const fetchPackage = async () => {
    const data = await GetAPI(`${BASE_URL}${GET_PACKAGING}`);
    if (
      data?.status === STATUS_CODE?.SUCCESS_CODE ||
      data?.status === STATUS_CODE?.SUCCESS_CODE_1
    ) {
      setPackagingType(data?.data);
    } else {
      message.error(data);
    }
  };

  const fetchCategory = async () => {
    const data = await GetAPI(`${BASE_URL}${GET_CATEGORY}`);
    if (
      data?.status === STATUS_CODE?.SUCCESS_CODE ||
      data?.status === STATUS_CODE?.SUCCESS_CODE_1
    ) {
      setCategoryType(data?.data);
    } else {
      message.error(data);
    }
  };

  // const onFinish = (values) => {
  //   console.log("Success:", values);
  // };

  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };
  // const onGenderChange = (value) => {
  //   switch (value) {
  //     case "male":
  //       form.setFieldsValue({ note: "Hi, man!" });
  //       break;
  //     case "female":
  //       form.setFieldsValue({ note: "Hi, lady!" });
  //       break;
  //     case "other":
  //       form.setFieldsValue({ note: "Hi there!" });
  //       break;
  //     default:
  //   }
  // };
  // const { Dragger } = Upload;

  // const props = {
  //   name: "file",
  //   multiple: false,
  //   // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  //   onChange(info) {
  //     const { status } = info.file;
  //     if (status !== "uploading") {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (status === "done") {
  //       message.success(`${info.file.name} file uploaded successfully.`);
  //     } else if (status === "error") {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  //   onDrop(e) {
  //     console.log("Dropped files", e.dataTransfer.files);
  //   },
  // };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();

      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setDataSource(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setDataSource(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const edit = (record) => {
    form.setFieldsValue({
      salesType: "",
      Units: "",
      Min: "",
      Max: "",
      ...record,
    });
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
    console.log("row", row?.key);
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
      title: "Sales Type",
      dataIndex: "salesType",
      editable: true,
    },
    {
      title: "Units Per Sales Type",
      dataIndex: "Units",
      editable: true,
    },
    {
      title: "Min. Order Quantity",
      dataIndex: "Min",
      editable: true,
    },
    {
      title: "Max. Order Quantity",
      dataIndex: "Max",
      editable: true,
    },
    {
      title: "",
      dataIndex: "",
      render: (row) => {
        const contentData = assignContentData(row);
        const editable = isEditing(row);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(row.key)}
              style={{ marginRight: 8 }}
            >
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
    },
  ];
  // const mergedColumns = columns.map((col) => {
  //   if (!col.editable) {
  //     return col;
  //   }
  //   return {
  //     ...col,
  //     onCell: (record) => ({
  //       record,
  //       inputType: col.dataIndex === "age" ? "number" : "text",
  //       dataIndex: col.dataIndex,
  //       title: col.title,
  //       editing: isEditing(record),
  //     }),
  //   };
  // });
  // const handleAdd = () => {
  //   const newData = {
  //     key: count,
  //     salesType: `Edward King ${count}`,
  //     Units: "32",
  //     Min: `London, Park Lane no. ${count}`,
  //     Max: "895",
  //   };
  //   setDataSource([...dataSource, newData]);
  //   setCount(count + 1);
  // };
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  // const EditableCell = ({
  //   editing,
  //   dataIndex,
  //   title,
  //   inputType,
  //   record,
  //   index,
  //   children,
  //   ...restProps
  // }) => {
  //   const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  //   return (
  //     <td {...restProps}>
  //       {editing ? (
  //         <Form.Item
  //           name={dataIndex}
  //           style={{ margin: 0 }}
  //           rules={[
  //             {
  //               required: true,
  //               message: `Please Input ${title}!`,
  //             },
  //           ]}
  //         >
  //           {inputNode}
  //         </Form.Item>
  //       ) : (
  //         children
  //       )}
  //     </td>
  //   );
  // };
  const newProduct = () => {
    setLoading(true);
    if (true) {
      const payload = {
        productName: productName,
        modelName: modelName,
        productCode: code,
        categoryName: category,
        groupCode: groupCode,
        unitId: 1,
        unitName: unitVal,
        brandId: 1,
        brandName: brandName,
        itemDescription: about,
        packing_type: packingType,
        categoryId: 1,
        weight: weight,
        productDescription: description,
        image: imageUrl,
        stockInHand: stockInHand,
        reStockLevel: minStock,
        // createdAt: "2023-06-11T23:03:05",
        // updatedAt: null,
        imageType: imageType,
        unitsPerPackaging: unitsNo,
        pricePerPackage: packagingPrice,
        minOrderQuantity: minOrder,
        maxOrderQuantity: minStock,
        status: "Active",
        itemCode: "101",
      };
      POSTAPI(`${BASE_URL}${CREATE_PRODUCT}`, payload)
        .then((res) => {
          console.log("res", res);
          if (
            res?.status === STATUS_CODE?.SUCCESS_CODE ||
            res?.status === STATUS_CODE?.SUCCESS_CODE_1
          ) {
            setLoading(false);
            message.success("Product Added Successfully.");
            navigate(AdminScreens?.product, { state: { fetch: true } });
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

  return (
    <div className="AddProduct">
      <DetailsTop AddProduct={true} newProduct={newProduct} />
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
                  <Input
                    placeholder="Enter product name"
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Model"
                  name="model"
                  rules={[
                    { required: false, message: "Please input your Model!" },
                  ]}
                >
                  <Input
                    placeholder="Enter model"
                    onChange={(e) => setModalName(e.target.value)}
                  />
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
                  <Input
                    placeholder="Enter code"
                    onChange={(e) => setCode(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="category"
                  label="Category"
                  rules={[{ required: false }]}
                >
                  <Select
                    placeholder="Select Category"
                    onChange={(val) => setCategory(val)}
                    allowClear
                  >
                    {categoryType.length > 0 &&
                      categoryType.map((item) => {
                        return (
                          <Option value={item?.categoryName}>
                            {item?.categoryName}
                          </Option>
                        );
                      })}
                  </Select>
                </Form.Item>
              </div>
              <div className="Account2">
                {/* <Form.Item
                  name="groupcode"
                  label="Group code"
                  rules={[{ required: false }]}
                >
                  <Select
                    placeholder="Select code"
                    onChange={(val) => setGroupCode(val)}
                    allowClear
                  >
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                  </Select>
                </Form.Item> */}
                <Form.Item
                  name="unit"
                  label="Unit"
                  rules={[{ required: false }]}
                >
                  <Select
                    placeholder="Select unit"
                    onChange={(val) => setUnitVal(val)}
                    allowClear
                  >
                    {unit.length > 0 &&
                      unit.map((item) => {
                        return (
                          <Option value={item?.unitName}>
                            {item?.unitName}
                          </Option>
                        );
                      })}
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
                    onChange={(val) => setBrandName(val)}
                    allowClear
                  >
                    {brand.length > 0 &&
                      brand.map((item) => {
                        return (
                          <Option key={item?.brandId} value={item?.brandName}>
                            {item?.brandName}
                          </Option>
                        );
                      })}
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
                      onChange={(e) => setWeight(e.target.value)}
                      className="weightInput"
                    />
                    <Select
                      placeholder="Kg"
                      className="weightDropdown"
                      onChange={(val) => setWeightUnit(val)}
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
              {/* <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or Drag Product Photo here.
                </p>
              </Dragger> */}
              <Upload
                listType="picture-card"
                accept="image/*"
                beforeUpload={handleFileUpload}
                onPreview={onPreview}
                onChange={onChange}
              >
                {fileList.length < 1 && "+ Upload"}
              </Upload>
            </div>
          </div>
        </Form>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
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
              <Input.TextArea
                placeholder="Enter product description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Item>
          </div>
          <div className="ProductDescription">
            <Title title="About the Item" />
            <Form.Item
              name="item"
              rules={[
                {
                  required: false,
                  message: "Please input your description!",
                },
              ]}
            >
              <Input.TextArea
                placeholder="Enter product description"
                onChange={(e) => setItemDetails(e.target.value)}
              />
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
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="salesDetails">
            <Form.Item
              label="Packaging Type"
              name="type"
              // rules={[
              //   { required: true, message: "Please input your package type!" },
              // ]}
            >
              <Select
                placeholder="Select Packaging Type"
                className="Category"
                onChange={(val) => setPackingType(val)}
                allowClear
              >
                {packagingType?.length > 0 &&
                  packagingType?.map((item) => (
                    <Option key={item?.packing_id} value={item?.packing_type}>
                      {item?.packing_type}
                    </Option>
                  ))}
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
              <Input
                placeholder="Enter product price in INR"
                onChange={(e) => setUnitsNo(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Packaging price"
              name="units"
              rules={[{ required: true, message: "Please input your units!" }]}
            >
              <Input
                placeholder="Enter units per sales type"
                onChange={(e) => setPackagingPrice(e.target.value)}
              />
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
              <Input
                placeholder="Enter min quantity"
                onChange={(e) => setMinOrder(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Maximum Order Quantity"
              name="Quantity"
              rules={[
                { required: true, message: "Please input your max. Quantity!" },
              ]}
            >
              <Input
                placeholder="Enter max order quantity"
                onChange={(e) => setMaxOrder(e.target.value)}
              />
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
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
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
              <Input
                placeholder="Enter min stock quantity"
                onChange={(e) => setMinStock(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Stock In Hand"
              name="stock"
              rules={[
                {
                  required: true,
                  message: "Please input your stock in hand!",
                },
              ]}
            >
              <Input
                placeholder="Enter stock in hand"
                onChange={(e) => setStockInHand(e.target.value)}
              />
            </Form.Item>
          </div>
        </Form>
      </div>
      {/* <div className="SalesContainer">
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
      </div> */}
    </div>
  );
}

export default AddProduct;
