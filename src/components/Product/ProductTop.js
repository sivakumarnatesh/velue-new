import React from "react";
import Title from "../../sharedComponents/Title/Title";
import { Input, Select } from "antd";
import { InboxOutlined, SearchOutlined } from "@ant-design/icons";
// import { ORDER_STATUS } from "../../utils/Variables/DefaultData";
import { useState } from "react";
import CustomModal from "../../sharedComponents/Modal/CustomModal";
import { message, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { AdminScreens } from "../../utils/Routing/RoutePath";
import { useEffect } from "react";

const ProductTop = ({searchProduct}) => {
  const [addProduct, setAddProduct] = useState(false);
  const [productId,setProductId] = useState('');

  const { Option } = Select;
  const navigate = useNavigate();
  const PRODUCT_STATUS = ["Active", "Disable"];
  const ITEMS = ["Add Item", "Add Bulk Items"];

  const handleUpload = (val) => {
    console.log("val", val);
    if (val === "Add Item") {
      console.log("add item");
      navigate(AdminScreens?.addproduct);
    } else {
      setAddProduct(true);
    }
  };
  const onCancel = () => {
    setAddProduct(false);
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
  useEffect(() => {
    searchProduct(productId);
  }, [productId]);



  return (
    <div className="OrdersTop">
      <div>
        <Title title="All Products" className="AllOrders" />
      </div>
      <div className="SearchBar">
        <Input
          size="small"
          placeholder="Search Product Name"
          prefix={<SearchOutlined />}
          onChange={(e) => setProductId(e.target.value)}
        />
      </div>

      <div className="StatusDropdown">
        <Select style={{ width: 200 }} placeholder="Status">
          {PRODUCT_STATUS.length > 0 &&
            PRODUCT_STATUS?.map((item) => {
              return (
                <Option className="Options" value={item}>
                  {item}
                </Option>
              );
            })}
        </Select>
      </div>
      <div className="ItemDropdown">
        <Select placeholder="Upload Item" onChange={handleUpload}>
          {ITEMS.length > 0 &&
            ITEMS?.map((item) => {
              return (
                <Option className="Options" value={item}>
                  {item}
                </Option>
              );
            })}
        </Select>
      </div>
      <CustomModal
        visible={addProduct}
        onCancel={onCancel}
        closeOnPress={onCancel}
        className="UploadBulkProduct"
      >
        <Title title="Product Bulk Upload" className="bulkuploadTitle" />
        <div className="uploadDragger">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag product list here.</p>
          </Dragger>
        </div>
      </CustomModal>
    </div>
  );
};

export default ProductTop;
