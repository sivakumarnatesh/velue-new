import React, { useState } from "react";
import "./Product.scss";
import UpdateProduct from "./UpdateProduct";
import Title from "../../sharedComponents/Title/Title";
import CustomButton from "../../sharedComponents/Buttons/CustomButton";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Typography,
  Upload,
  message,
} from "antd";
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
import { useLocation, useNavigate } from "react-router-dom";
import {
  BASE_URL,
  EDIT_PRODUCT,
  GET_BRANDS,
  GET_CATEGORY,
  GET_PACKAGING,
  GET_UNITS,
} from "../../utils/API/EndPoint";
import { STATUS_CODE } from "../../utils/Variables/DefaultData";
import { useEffect } from "react";
import { GetAPI, PUTAPI } from "../../utils/API";
import { AdminScreens } from "../../utils/Routing/RoutePath";
import axios from "axios";

const ProductDetails = () => {
  const [fileList, setFileList] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [editItem, setEditItem] = useState(false);
  const [editSales, setEditSales] = useState(false);
  const [editInventory, setEditInventory] = useState(false);
  const [editPurchase, setEditPurchase] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [imageType, setImageType] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const location = useLocation();
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
  const [productName, setProductName] = useState("");
  const [modelName, setModalName] = useState("");
  const [code, setCode] = useState("");
  const [category, setCategory] = useState("");
  const [categoryType, setCategoryType] = useState([]);
  const [unit, setUnit] = useState([]);
  const [unitVal, setUnitVal] = useState("");
  const [unitsNo, setUnitsNo] = useState("");
  const [brand, setBrand] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [packagingType, setPackagingType] = useState([]);
  const [packingType, setPackingType] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("");
  const [description, setDescription] = useState("");
  const [about, setAbout] = useState("");
  const [minOrder, setMinOrder] = useState("");
  const [maxOrder, setMaxOrder] = useState("");
  const [minStock, setMinStock] = useState("");
  const [packagingPrice, setPackagingPrice] = useState("");
  const [stockInHand, setStockInHand] = useState("");
  // const [imageUrl, setImageUrl] = useState("");

  const { Option } = Select;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    setProductName(location?.state?.productDetail?.productName);
    setModalName(location?.state?.productDetail?.modelName);
    setCode(location?.state?.productDetail?.productCode);
    setCategory(location?.state?.productDetail?.categoryName);
    setUnitVal(location?.state?.productDetail?.unitName);
    setBrandName(location?.state?.productDetail?.brandName);
    setWeight(location?.state?.productDetail?.weight);
    setDescription(location?.state?.productDetail?.productDescription);
    setAbout(location?.state?.productDetail?.itemDescription);
    setPackingType(location?.state?.productDetail?.packing_type);
    setUnitsNo(location?.state?.productDetail?.unitsPerPackaging);
    setPackagingPrice(location?.state?.productDetail?.pricePerPackage);

    setMinOrder(location?.state?.productDetail?.minOrderQuantity);
    setMaxOrder(location?.state?.productDetail?.maxOrderQuantity);

    setMinStock(location?.state?.productDetail?.reStockLevel);
    console.log(location?.state?.productDetail);  
    setStockInHand(location?.state?.productDetail?.stockInHand);
  }, []);

  // const handleUpload = async (options) => {
  //   const { onSuccess, file } = options;
  //   const formData = new FormData();
  //   formData.append("file", file);

  //   try {
  //     const response = await axios.post("your-upload-url", formData);
  //     const { imageUrl } = response.data; // Assuming the API returns the image URL
  //     setImageUrl(imageUrl);
  //     onSuccess("OK");
  //   } catch (error) {
  //     console.error("Image upload failed:", error);
  //     onSuccess("Error");
  //   }
  // };
  // console.log("imageURL", imageUrl);
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
  // const { Dragger } = Upload;

  // const props = {
  //   name: "file",
  //   multiple: true,
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

  // const onChange = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  // };

  // const onPreview = async (file) => {
  //   let src = file.url;
  //   if (!src) {
  //     src = await new Promise((resolve) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file.originFileObj);
  //       reader.onload = () => resolve(reader.result);
  //     });
  //   }
  //   const image = new Image();
  //   image.src = src;
  //   const imgWindow = window.open(src);
  //   imgWindow?.document.write(image.outerHTML);
  // };
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
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
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
      Units: "32",
      Min: `London, Park Lane no. ${count}`,
      Max: "895",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
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
  // const [fileList, setFileList] = useState([]);

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
      // const blob = new Blob([reader.result], { type: file.type });
      setImageType(Blob?.type);
      // const blobimg = new Blob([file], { type: "image/png" });
      const imageUrl = URL.createObjectURL(file);
      console.log("blob", imageUrl);

      setImageUrl(imageUrl);
      // URL.revokeObjectURL(imageUrl);
    };
    reader.readAsArrayBuffer(file);
  };
  const validateCredentials = (Row) => {
    // FindLoader(true);

    const payload = {
      productId: location?.state?.productDetail?.productId,
      productName: productName,
      modelName: modelName,
      productCode: code,
      categoryName: category,
      groupCode: location?.state?.productDetail?.groupCode,
      unitId: location?.state?.productDetail?.unitId,
      unitName: unitVal,
      brandId: location?.state?.productDetail?.brandId,
      brandName: brandName,
      itemDescription: about,
      packing_type: packingType,
      categoryId: location?.state?.productDetail?.categoryId,
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
      maxOrderQuantity: maxOrder,
      status: "Active",
      itemCode: location?.state?.productDetail?.itemCode,
    };
    console.log("payload", payload);
    PUTAPI(`${BASE_URL}${EDIT_PRODUCT}${Row?.productId}`, payload)
      .then((res) => {
        console.log("res", res);
        if (
          res?.status === STATUS_CODE?.SUCCESS_CODE ||
          res?.status === STATUS_CODE?.SUCCESS_CODE_1
        ) {
          onCancel();
          // FindLoader(false);
          message.success("Product details updated successfully.");
          navigate(AdminScreens?.product);
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
    <div className="ProductDetail">
      <UpdateProduct data={location?.state?.productDetail} />
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
              <Title
                title={location?.state?.productDetail?.productName}
                className="IValue"
              />
            </div>
            <div className="Details">
              <Title title="Model" className="IName" />
              <Title
                title={location?.state?.productDetail?.modelName}
                className="IValue"
              />
            </div>
            <div className="Details">
              <Title title="Code" className="IName" />
              <Title
                title={location?.state?.productDetail?.productCode}
                className="IValue"
              />
            </div>
            <div className="Details">
              <Title title="Category" className="IName" />
              <Title
                title={location?.state?.productDetail?.categoryName}
                className="IValue"
              />
            </div>
            {/* <div className="Details">
              <Title title="Group Code" className="IName" />
              <Title
                title={location?.state?.productDetail?.groupCode}
                className="IValue"
              />
            </div> */}
            <div className="Details">
              <Title title="Unit" className="IName" />
              <Title
                title={location?.state?.productDetail?.unitName}
                className="IValue"
              />
            </div>
            <div className="Details">
              <Title title="Brand" className="IName" />
              <Title
                title={location?.state?.productDetail?.brandName}
                className="IValue"
              />
            </div>
            <div className="Details">
              <Title title="Weight" className="IName" />
              <Title
                title={location?.state?.productDetail?.weight}
                className="IValue"
              />
            </div>
            {/* <div className="Details">
              <Title title="HSN Code" className="IName" />
              <Title title="543488796" className="IValue" />
            </div> */}
            <div className="Details">
              <Title title="Description" className="IName" />
              <Title
                title={location?.state?.productDetail?.itemDescription}
                className="IValue"
              />
            </div>
          </div>
          {console.log("location", location.state.productDetail.image)}
          <div className="ProductImage">
            {/* <ImgCrop rotationSlider>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                <div>{fileList.length < 1 && uploadButton}</div>
              </Upload>
            </ImgCrop> */}
            {/* <Upload
              listType="picture-card"
              accept="image/*"
              fileList={fileList}
              beforeUpload={handleFileUpload}
              onPreview={onPreview}
              onChange={onChange}
            >
              {fileList.length < 1 && "+ Upload"}
            </Upload> */}
            <img
              src={location?.state?.productDetail?.image}
              alt="image_url"
              style={{ width: "200px", height: "200px" }}
            />
            {/* <div>fsgfsgfsgdfg</div>
            {console.log('imageURL',imageUrl)}
            <img src={imageUrl} /> */}

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
            <Title
              title={location?.state?.productDetail?.pricePerPackage}
              className="IValue"
            />
          </div>
          <div className="Details">
            <Title title="Sales Type" className="IName" />
            <Title
              title={location?.state?.productDetail?.packing_type}
              className="IValue"
            />
          </div>
          <div className="Details">
            <Title title="No. of unit per sales Type" className="IName" />
            <Title
              title={location?.state?.productDetail?.unitsPerPackaging}
              className="IValue"
            />
          </div>
          <div className="Details">
            <Title title="Min. Sales order Quantity" className="IName" />
            <Title
              title={location?.state?.productDetail?.minOrderQuantity}
              className="IValue"
            />
          </div>

          <div className="Details">
            <Title title="Max. Sales order Quantity" className="IName" />
            <Title
              title={location?.state?.productDetail?.maxOrderQuantity}
              className="IValue"
            />
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
            <Title
              title={location?.state?.productDetail?.reStockLevel}
              className="IValue"
            />
          </div>
          <div className="Details">
            <Title title="Stock In Hand" className="IName" />
            <Title
              title={location?.state?.productDetail?.stockInHand}
              className="IValue"
            />
          </div>
        </div>
      </div>
      {/* <div className="ItemDetails">
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
      </div> */}
      <CustomModal
        visible={showDetails}
        onCancel={onCancel}
        closeOnPress={onCancel}
        className="ViewProduct"
      >
        <Title title="Product Details" className="ProductImageDetails" />
        <img
          src={location?.state?.productDetail?.image}
          className="ProductImageView"
          alt="Product"
        />
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
                      <Input
                        placeholder="Enter product name"
                        defaultValue={
                          location?.state?.productDetail?.productName
                        }
                        onChange={(e) => setProductName(e.target.value)}
                      />
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
                      <Input
                        placeholder="Enter model"
                        defaultValue={location?.state?.productDetail?.modelName}
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
                        defaultValue={
                          location?.state?.productDetail?.productCode
                        }
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
                        defaultValue={
                          location?.state?.productDetail?.categoryName
                        }
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
                        onChange={onGenderChange}
                        defaultValue={location?.state?.productDetail?.groupCode}
                        allowClear
                      >
                        <Option value="male">Indian Bank</Option>
                        <Option value="female">HDFC Bank</Option>
                        <Option value="other">other</Option>
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
                        defaultValue={location?.state?.productDetail?.unitName}
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
                        defaultValue={location?.state?.productDetail?.brandName}
                        allowClear
                      >
                        {brand.length > 0 &&
                          brand.map((item) => {
                            return (
                              <Option
                                key={item?.brandId}
                                value={item?.brandName}
                              >
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
                          defaultValue={location?.state?.productDetail?.weight}
                          onChange={(e) => setWeight(e.target.value)}
                          className="weightInput"
                        />
                        <Select
                          placeholder="Kg"
                          className="weightDropdown"
                          defaultValue={
                            location?.state?.productDetail?.productName
                          }
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
                    defaultValue={
                      location?.state?.productDetail?.productDescription
                    }
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className="ProductDescription">
                <Title title="About the Item" />
                <Form.Item
                  name="about"
                  rules={[
                    {
                      required: false,
                      message: "Please input your description!",
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Enter product description"
                    defaultValue={
                      location?.state?.productDetail?.itemDescription
                    }
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </Form.Item>
                {console.log("sdvsv", location?.state?.productDetail)}
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
                onClick={() =>
                  validateCredentials(location?.state?.productDetail)
                }
              />
            </div>
          </div>
        }
      />
      <CustomModal
        className="EditItem"
        visible={editSales}
        onCancel={() => setEditSales(false)}
        closeOnPress={() => setEditSales(false)}
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
                  <Input
                    placeholder="Enter product price in INR"
                    defaultValue={
                      location?.state?.productDetail?.pricePerPackage
                    }
                    onChange={(e) => setPackagingPrice(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
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
                    placeholder="Select Packaging Type"
                    className="Category"
                    onChange={(val) => setPackingType(val)}
                    defaultValue={location?.state?.productDetail?.packing_type}
                    allowClear
                  >
                    {packagingType?.length > 0 &&
                      packagingType?.map((item) => (
                        <Option
                          key={item?.packing_id}
                          value={item?.packing_type}
                        >
                          {item?.packing_type}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Number of Units Per Sales Type"
                  name="units"
                  rules={[
                    { required: true, message: "Please input your units!" },
                  ]}
                >
                  <Input
                    placeholder="Enter units per sales type"
                    defaultValue={
                      location?.state?.productDetail?.unitsPerPackaging
                    }
                    onChange={(e) => setUnitsNo(e.target.value)}
                  />
                </Form.Item>
              </div>
              {/* <div className="sBtn">
                <CustomButton
                  text="+ Add Sales Package"
                  onClick={handleAdd}
                  className="SalesPackage"
                />
              </div> */}
              <div className="salesDetailsTable">
                <Form.Item
                  label="Min. Sales Order Quantity"
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
                    defaultValue={
                      location?.state?.productDetail?.minOrderQuantity
                    }
                    onChange={(e) => setMinOrder(e.target.value)}
                  />
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
                  <Input
                    placeholder="Enter max order quantity"
                    defaultValue={
                      location?.state?.productDetail?.maxOrderQuantity
                    }
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
            <div className="Buttons">
              <CustomButton
                text="Cancel"
                className="Reject"
                onClick={() => onCancel()}
              />
              <CustomButton
                text="Save"
                className="Approve"
                onClick={() =>
                  validateCredentials(location?.state?.productDetail)
                }
              />
            </div>
          </div>
        }
      />
      <CustomModal
        className="EditItem"
        visible={editInventory}
        onCancel={() => setEditInventory(false)}
        closeOnPress={() => setEditInventory(false)}
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
                  name="stockinhand"
                  rules={[
                    {
                      required: true,
                      message: "Please input your min. stock!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter min stock quantity"
                    defaultValue={location?.state?.productDetail?.stockInHand}
                    onChange={(e) => setMinStock(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Stock In Hand"
                  name="threshold"
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
            <div className="Buttons">
              <CustomButton
                text="Cancel"
                className="Reject"
                onClick={() => onCancel()}
              />
              <CustomButton
                text="Save"
                className="Approve"
                onClick={() =>
                  validateCredentials(location?.state?.productDetail)
                }
              />
            </div>
          </div>
        }
      />
      <CustomModal
        className="EditItem"
        visible={editPurchase}
        onCancel={() => setEditPurchase(false)}
        closeOnPress={() => setEditPurchase(false)}
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
                onClick={() => onCancel()}
              />
              <CustomButton
                text="Save"
                className="Approve"
                onClick={() =>
                  validateCredentials(location?.state?.productDetail)
                }
              />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default ProductDetails;
