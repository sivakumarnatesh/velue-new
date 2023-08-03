import React, { useState } from "react";
import Title from "../../sharedComponents/Title/Title";
import {
  DeleteOutlined,
  LeftOutlined,
  MinusOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { AdminScreens } from "../../utils/Routing/RoutePath";
import { useNavigate } from "react-router-dom";
import PopOver from "../../sharedComponents/PopOver/PopOver";
import CustomButton from "../../sharedComponents/Buttons/CustomButton";
import "./Orders.scss";
import {
  Button,
  Checkbox,
  Input,
  Popconfirm,
  Select,
  Typography,
  message,
} from "antd";
import AntdTable from "../../sharedComponents/AntdTable/AntdTable";
import CustomModal from "../../sharedComponents/Modal/CustomModal";
import { useEffect } from "react";
import {
  BASE_URL,
  CREATE_ORDER,
  LIST_CUSTOMER,
  LIST_PRODUCT,
  SEARCH_PRODUCT,
} from "../../utils/API/EndPoint";
import { STATUS_CODE } from "../../utils/Variables/DefaultData";
import { GetAPI, POSTAPI } from "../../utils/API";

function OrderInsertion() {
  // const [form] = Form.useForm();
  const navigate = useNavigate();
  const { Option } = Select;
  const [urgentDelivery, setUrgentDelivery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [counter, setCounter] = useState(0);
  const [customerData, setCustomerData] = useState([]);
  const [cName, setCName] = useState([]);
  const [cReceivables, setCReceivables] = useState("0");
  const [cOverDue, setCOverDue] = useState("0");
  const [val, setVal] = useState("");
  const [productData, setProductData] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [checkProduct, setCheckProduct] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [count, setCount] = useState(1);
  const [dataSource, setDataSource] = useState([]);
  const [orderStatus, setOrderStatus] = useState("Confirm");
  const [totalAmount, setTotalAmount] = useState("");
  const [customerId, setCustomerId] = useState("");

  useEffect(() => {
    fetchCustomer();
  //   // fetchProduct();
  }, []);

  useEffect(() => {
    orderStatus === "Place Order" && placeOrder();
  }, [orderStatus]);

  useEffect(() => {
    console.log("datasource", dataSource);
    let sum = 0;
    for (let i = 0; i < dataSource.length; i++) {
      sum = sum + +dataSource[i]?.amount;
      console.log("sum", sum);
    }
    setTotalAmount(sum);
  }, [dataSource]);

  function removeDuplicatesKeepLatestById() {
    const uniqueObjects = {};

    for (const obj of quantity) {
      uniqueObjects[obj.id] = obj;
    }

    setQuantity(Object.values(uniqueObjects));
    return Object.values(uniqueObjects);
  }

  const changeCounter = async (e, item) => {
    setQuantity((prev) => [
      ...prev,
      { id: `${item?.productId}`, val: `${e.target.value}` },
    ]);
  };
  const fetchProduct = async () => {
    const data = await GetAPI(`${BASE_URL}${LIST_PRODUCT}`);
    if (
      data?.status === STATUS_CODE?.SUCCESS_CODE ||
      data?.status === STATUS_CODE?.SUCCESS_CODE_1
    ) {
      setProductData(data?.data);
      for (let i = 0; i < data?.data.length; i++) {
        setCheckProduct((prev) => [
          ...prev,
          { data: data?.data[i], checked: false },
        ]);
      }
    } else {
      message.error(data);
    }
  };
// console.log('checkProduc',checkProduct)
  const fetchById = async () => {
    const data = await GetAPI(
      `${BASE_URL}${SEARCH_PRODUCT}${val}?productSearchType=PRODUCT_NAME`
    );
    if (
      data?.status === STATUS_CODE?.SUCCESS_CODE ||
      data?.status === STATUS_CODE?.SUCCESS_CODE_1
    ) {
      setProductData([{ data: data?.data, checked: false }]);

      // for (let i = 0; i < data?.data.length; i++) {
      //   setCheckProduct((prev) => [
      //     ...prev,
      //     { data: data?.data[i], checked: false },
      //   ]);
      // }
    } else {
      console.log(data);
    }
  };
  console.log("product data", productData);
  // console.log('check product',checkProduct);
  console.log("selected", selectedItem);
  useEffect(() => {
    if (val !== "") {
      fetchById();
    } else {
      fetchProduct();
    }
  }, [val]);

  const placeOrder = () => {
    // FindLoader(true);
    if (true) {
      const payload = {
        customerId: customerId,

        // orderDate: "2023-06-03T08:28:57",

        orderStatus: orderStatus === "Place Order" ? "New" : "Drafted",

        paymentMethod: "cash",

        totalAmount: totalAmount,

        // updatedBy: "abi",

        // createdAt: "2023-06-03T08:28:57",

        // updatedAt: "2023-06-03T08:28:57",
        product: dataSource.map((item) => {
          return {
            productId: `${item?.productId}`,
            orderQuantity: `${item?.noOfQuantity}`,
          };
        }),

        // product: [
        //   {
        //     productId: 5,

        //     orderQuantity: 200,
        //   },
        //   {
        //     productId: 1,

        //     orderQuantity: 200,
        //   },
        // ],
      };
      POSTAPI(`${BASE_URL}${CREATE_ORDER}`, payload)
        .then((res) => {
          console.log("res", res);
          if (
            res?.status === STATUS_CODE?.SUCCESS_CODE ||
            res?.status === STATUS_CODE?.SUCCESS_CODE_1
          ) {
            // onCancel();
            // FindLoader(false);
            message.success("Order Inserted Successfully.");
            navigate(AdminScreens?.orders);
            // fetch();
          }
        })
        .catch((err) => {
          console.log("err", err);
          // FindLoader(false);
          message.error(err.message);
        });
    }
  };
  const edit = (row) => {
    setModalVisible(true);
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
    if (true) {
      const val = {
        text: "Delete",
        // onClick: () => deleteMember(row),
      };
      result = [...result, val];
    }
    return result;
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "sNo",
      //   render: (text) => {
      //     return <div>{text?.charAt(0)?.toUpperCase() + text?.slice(1)}</div>;
      //   },
    },
    {
      title: "Goods Description",
      dataIndex: "goodsDescription",
      // render: (text, record) => {
      //   return (
      //     <div className="Goods">
      //       <div>
      //         <img src={record?.image} alt="Product_image" />
      //       </div>
      //       <div>
      //         <div className="ProductName">Bath Facuet</div>
      //         <div>
      //           <div className="GoodsDetails">
      //             <Title title="Item Code:" className="CodeTitle" />
      //             <Title title="ID45897834" className="Code" />
      //           </div>
      //           <div className="GoodsDetails">
      //             <Title title="Brand:" className="CodeTitle" />
      //             <Title title="ID45897834" className="Code" />
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   );
      // },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      editable: true,
      //   render: (text) => {
      //     return <div>{text?.charAt(0)?.toUpperCase() + text?.slice(1)}</div>;
      //   },
    },
    {
      title: "Rate(R.s)",
      dataIndex: "rate",
      //   render: (text) => {
      //     return <div>{text?.charAt(0)?.toUpperCase() + text?.slice(1)}</div>;
      //   },
    },
    {
      title: "Per",
      dataIndex: "per",
      //   render: (text) => {
      //     return <div>{text?.charAt(0)?.toUpperCase() + text?.slice(1)}</div>;
      //   },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      //   render: (text) => {
      //     return <div>{text?.charAt(0)?.toUpperCase() + text?.slice(1)}</div>;
      //   },
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      width: "10%",
      align: "center",
      render: (row) => {
        const contentData = assignContentData(row);
        return (
          <PopOver
            getPopupContainer={(triggerNode) => triggerNode}
            content={contentData}
            children={<MoreOutlined className="dotIcon" />}
          />
        );
      },
    },
  ];
  let customerName = [];

  useEffect(() => {
    if (customerData.length > 0) {
      customerData?.map((item, index) => {
        customerName.push({
          value: `${item?.customerId}`,
          label: `${item?.customerName}`,
        });
      });
      setCName(customerName);
    }
  }, [customerData]);

  const fetchCustomer = async () => {
    const data = await GetAPI(`${BASE_URL}${LIST_CUSTOMER}`);
    if (
      data?.status === STATUS_CODE?.SUCCESS_CODE ||
      data?.status === STATUS_CODE?.SUCCESS_CODE_1
    ) {
      console.log("data", data);
      setCustomerData(data?.data);
    } else {
      message.error(data);
    }
  };

  const onCancel = () => {
    setModalVisible(false);
    navigate(AdminScreens?.orders);
  };
  const changeCustomer = (value, option) => {
    for (let i = 0; i < customerData.length; i++) {
      if (value == customerData[i]?.customerId) {
        setCReceivables(customerData[i]?.outstandingLimit);
        setCOverDue(customerData[i]?.overdue);
        setCustomerId(value);
      }
    }
  };
  const productSelected = (e, item) => {
    // console.log('e',e);
    // console.log('item',item)
    if (e === "") {
      const newState = checkProduct.map((obj) => {
        if (obj?.data?.productId === item?.productId) {
          return { ...obj, checked: false };
        }
        return obj;
      });
      setCheckProduct(newState);
      setSelectedItem(
        selectedItem.filter((val) => val?.productId !== item?.productId)
      );
    } else {
      if (e.target.checked) {
        const newState = checkProduct.map((obj) => {
          if (obj?.data?.productId === item?.data?.productId) {
            return { ...obj, checked: true };
          }
          return obj;
        });
        setCheckProduct(newState);
        setSelectedItem((preval) => [...preval, item?.data]);
      } else if (e.target.checked === false) {
        const newState = checkProduct.map((obj) => {
          if (obj?.data?.productId === item?.data?.productId) {
            return { ...obj, checked: false };
          }
          return obj;
        });
        setCheckProduct(newState);
        setSelectedItem(
          selectedItem.filter((val) => val?.productId !== item?.data?.productId)
        );
      }
    }
  };

  const addProduct = async () => {
    const res = await removeDuplicatesKeepLatestById();
    setDataSource([]);
    for (let i = 0; i < selectedItem.length; i++) {
      setDataSource((prev) => [
        ...prev,
        {
          productId: `${selectedItem[i]?.productId}`,
          noOfQuantity: `${res[i]?.val ?? 0}`,
          sNo: i + 1,
          goodsDescription: `${selectedItem[i]?.itemDescription}`,
          quantity: `${res[i]?.val ?? 0} ${selectedItem[i]?.packing_type}`,
          rate: `${selectedItem[i]?.pricePerPackage}`,
          per: `${selectedItem[i]?.unitName}`,
          amount: `${
            parseInt(res[i]?.val ?? 0) *
            parseInt(selectedItem[i]?.pricePerPackage)
          }`,
        },
      ]);
    }
    setCount(count + 1);
    setModalVisible(false);
  };
  const addNewProduct = () => {
    if (customerId) {
      setSelectedItem([]);
      let check = checkProduct.map((item) => {
        return { ...item, checked: false };
      });
      setCheckProduct(check);
      setModalVisible(true);
    } else {
      message.error("Please select customer name");
    }
  };

  return (
    <div className="OrderInsertion">
      <div className="DetailsTop">
        <div className="TopLeft">
          <div className="BackBtn">
            <LeftOutlined
              onClick={() => {
                navigate(AdminScreens?.orders);
              }}
            />
          </div>
          <div className="Titles">
            <>
              <Title title="Add Order" className="OrderID" />
            </>
          </div>
        </div>

        <div className="Buttons">
          <CustomButton
            text="Cancel"
            className="Reject"
            onClick={() => onCancel()}
          />
          {/* <CustomButton
            text="Confirm"
            className="Approve"
            // onClick={validateCredentials}
          /> */}

          <Select
            style={{ width: 130, height: "30px" }}
            className="confirm"
            defaultValue={orderStatus}
            onChange={(val) =>
              dataSource?.length > 0 && totalAmount !== 0
                ? setOrderStatus(val)
                : message.error("Please select products or quantity")
            }
            placeholder="Confirm"
            disabled={totalAmount === 0 && dataSource.length === 0}
          >
            <Option className="Options" value="Place Order">
              Place Order
            </Option>
            <Option className="Options" value="Save as draft">
              Save as draft
            </Option>
          </Select>
        </div>
      </div>
      <div className="OrderCenter">
        {/* <div>
          <Title title="Order ID" className="insertionTitle" />
          <Title title="OID4545455" className="OrderID" />
        </div> */}
        <div className="orderamtCenter">
          <div>
            <Title title="Customer *" className="insertionTitle" />

            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
              showSearch
              placeholder="Select Customer"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").toLowerCase().includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={cName}
              onChange={changeCustomer}
            />
          </div>
          <div className="orderamt">
            <div>
              <Title
                title="Outstanding Receivables"
                className="insertionTitle"
              />
              <Title title={cReceivables} className="OrderID" />
            </div>
            <div>
              <Title title="Overdue" className="insertionTitle" />
              <Title title={cOverDue} className="OrderID" />
            </div>
          </div>
        </div>
        {/* <div>
          {console.log("urgent delivery", urgentDelivery)}
          <Checkbox onChange={(e) => setUrgentDelivery(e.target.checked)}>
            <Title title="Urgent delivery?" className="insertionTitle" />
          </Checkbox>
          <div>
            {urgentDelivery && (
              <Select
                placeholder="Select Time"
                //   onChange={(val) => setCreditDays(val)}
                allowClear
              >
                <Option value="3hours">3 hours</Option>
                <Option value="6hours">6 hours</Option>
              </Select>
            )}
          </div>
        </div> */}
      </div>
      <div className="Titles">
        <div className="productDetailsTitle">
          <Title title="Product Details" className="productDetails" />
          <CustomButton
            text="+Add Products"
            className="AddProductBtn"
            onClick={addNewProduct}
          />
        </div>
      </div>
      <AntdTable
        className="userTable"
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: true }}
        limit={6}
      />
      <div className="OrderRupees">
        {/* <div className="OrderAlign">
          <div className="OrderTitle">Order Value</div>
          <div className="OrderAmt">126523.00</div>
        </div>
        <div className="OrderAlign">
          <div className="OrderTitle">Discount</div>
          <div className="OrderAmt">-274327.00</div>
        </div> */}
        <div className="OrderAlign">
          <div className="OrderTitle">Total Amount</div>
          <div className="OrderAmt">{totalAmount}</div>
        </div>
      </div>
      <CustomModal
        className="EditBusinessItem"
        visible={modalVisible}
        onCancel={onCancel}
        closeOnPress={onCancel}
        children={
          <div className="Details">
            <Title title="Add Products" className="AccountDetails" />
            <div className="ProductModal">
              <div className="ProductFirst">
                <div className="ProductFTop">
                  <Input
                    size="small"
                    placeholder="Search Products"
                    prefix={<SearchOutlined />}
                    onChange={(e) => setVal(e.target.value)}
                  />
                </div>
                <div style={{ height: 500, overflowY: "scroll" }}>
                  {checkProduct.length > 0 &&
                    val === "" &&
                    checkProduct.map((item, index) => {
                      return (
                        <div className="Goods">
                          <div>
                            <img
                              src={item?.data?.image}
                              alt="Product_image"
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: "12px",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              width: "80%",
                            }}
                          >
                            <div>
                              <div className="ProductName">
                                {item?.data?.productName}
                              </div>
                              <div>
                                <div className="GoodsDetails">
                                  <Title
                                    title="Good ID:"
                                    className="CodeTitle"
                                  />
                                  <Title
                                    title={item?.data?.productCode}
                                    className="Code"
                                  />
                                </div>
                                <div className="GoodsDetails">
                                  <Title title="Rate" className="CodeTitle" />
                                  <Title
                                    title={item?.data?.pricePerPackage}
                                    className="Code"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="ProductRight">
                              <div>
                                <div>Stock in hand</div>
                                <div className="pieces">
                                  {item?.data?.stockInHand +
                                    " " +
                                    item?.data?.packing_type}
                                </div>
                                <div>
                                  {item?.data?.unitsPerPackaging +
                                    " " +
                                    "units per" +
                                    " " +
                                    item?.data?.packing_type}
                                </div>
                              </div>
                              <div>
                                <Checkbox
                                  style={{
                                    marginLeft: "40px",
                                    marginRight: "20px",
                                  }}
                                  checked={item?.checked}
                                  onChange={(e) => productSelected(e, item)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  {productData.length > 0 &&
                    val !== "" &&
                    productData.map((item, index) => {
                      return (
                        <div className="Goods">
                          <div>
                            <img
                              src={item?.image}
                              alt="Product_image"
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: "12px",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              width: "80%",
                            }}
                          >
                            <div>
                              <div className="ProductName">
                                {item?.productName}
                              </div>
                              <div>
                                <div className="GoodsDetails">
                                  <Title
                                    title="Good ID:"
                                    className="CodeTitle"
                                  />
                                  <Title
                                    title={item?.productCode}
                                    className="Code"
                                  />
                                </div>
                                <div className="GoodsDetails">
                                  <Title title="Rate" className="CodeTitle" />
                                  <Title
                                    title={item?.pricePerPackage}
                                    className="Code"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="ProductRight">
                              <div>
                                <div>Stock in hand</div>
                                <div className="pieces">
                                  {item?.stockInHand + " " + item?.packing_type}
                                </div>
                                <div>
                                  {item?.unitsPerPackaging +
                                    " " +
                                    "units per" +
                                    " " +
                                    item?.packing_type}
                                </div>
                              </div>
                              <div>
                                <Checkbox
                                  style={{
                                    marginLeft: "40px",
                                    marginRight: "20px",
                                  }}
                                  // checked={false}
                                  onChange={(e) => productSelected(e, item)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="ProductSecond">
                <div className="ProductSTop">
                  <div className="SelectedItem">
                    Selected Items ({selectedItem.length})
                  </div>
                  <div className="Quantity">
                    Quantity
                    {/* {res.reduce(
                      (acc, item) => (acc += parseInt(item.val)),
                      0
                    )} */}
                  </div>
                </div>
                {selectedItem.length > 0 &&
                  selectedItem.map((item, index) => {
                    return (
                      <div className="Goods" key={index}>
                        <div>
                          <img
                            src={item?.image}
                            alt="Product_image"
                            style={{
                              width: 100,
                              height: 100,
                              borderRadius: "12px",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "80%",
                          }}
                        >
                          <div>
                            <div className="ProductName">
                              {item?.productName}
                            </div>
                            <div>
                              <div className="GoodsDetails">
                                <Title title="Good ID:" className="CodeTitle" />
                                <Title
                                  title={item?.productCode}
                                  className="Code"
                                />
                              </div>
                              <div className="GoodsDetails">
                                <Title title="Rate" className="CodeTitle" />
                                <Title
                                  title={item?.pricePerPackage}
                                  className="Code"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="ProductRight">
                            <div className="ProductQuantity">
                              {/* <div className="Increment">
                                <Button
                                  onClick={() =>
                                    counter >= 0 &&
                                    setCounter(parseInt(counter) + 1)
                                  }
                                  style={{
                                    fontWeight: "600",
                                    textAlign: "center",
                                  }}
                                >
                                  <PlusOutlined style={{ fontSize: "15px" }} />
                                </Button>
                              </div> */}
                              <div
                                style={{ marginTop: "6px", fontSize: "15px" }}
                              >
                                <input
                                  // value={counter}
                                  onChange={(e) => changeCounter(e, item)}
                                  style={{ padding: "5px", width: "100px" }}
                                />
                              </div>
                              {/* <div className="Decrement">
                                <Button
                                  onClick={() =>
                                    counter >= 1 &&
                                    setCounter(parseInt(counter) - 1)
                                  }
                                  style={{
                                    fontWeight: "600",
                                    textAlign: "center",
                                  }}
                                >
                                  <MinusOutlined style={{ fontSize: "15px" }} />
                                </Button>
                              </div> */}
                            </div>
                            <div
                              onClick={() => {
                                setSelectedItem(
                                  selectedItem.filter((i) => i !== index)
                                );
                                productSelected("", item);
                              }}
                            >
                              <DeleteOutlined
                                style={{
                                  marginLeft: "20px",
                                  fontSize: "24px",
                                  cursor: "pointer",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="Buttons">
              <CustomButton
                text="Cancel"
                className="Reject"
                onClick={() => onCancel()}
              />
              <CustomButton
                text="Add"
                className="Approve"
                onClick={addProduct}
              />
            </div>
          </div>
        }
      />
    </div>
  );
}

export default OrderInsertion;
