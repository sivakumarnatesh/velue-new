const ADMIN = "/admin";

export const BASE_ROUTE = {
  dashboard: `${ADMIN}/dashboard`,
  users: `${ADMIN}/users`,
  adduser: `${ADMIN}/users/adduser`,
  edituser: `${ADMIN}/users/edituser`,
  orders: `${ADMIN}/orders`,
  orderdetails: `${ADMIN}/orders/order-details`,
  orderInsertion: `${ADMIN}/orders/order-insertion`,
  product: `${ADMIN}/product`,
  report: `${ADMIN}/report`,
  customers: `${ADMIN}/customers`,
  settings: `${ADMIN}/settings`,
  addrole: `${ADMIN}/addrole`,
  addcustomer: `${ADMIN}/customers/addcustomer`,
  updatecustomer: `${ADMIN}/customers/updatecustomer`,
  addproduct: `${ADMIN}/addproduct`,
  productDetail: `${ADMIN}/product/product-details`,
};

export const AdminScreens = {
  dashboard: BASE_ROUTE.dashboard,
  users: BASE_ROUTE.users,
  adduser: BASE_ROUTE.adduser,
  edituser: BASE_ROUTE.edituser,
  orders: BASE_ROUTE.orders,
  orderdetails: BASE_ROUTE.orderdetails,
  orderInsertion: BASE_ROUTE.orderInsertion,
  product: BASE_ROUTE.product,
  customers: BASE_ROUTE.customers,
  report: BASE_ROUTE.report,
  settings: BASE_ROUTE.settings,
  addrole: BASE_ROUTE.addrole,
  addcustomer:BASE_ROUTE.addcustomer,
  updatecustomer: BASE_ROUTE.updatecustomer,
  addproduct: BASE_ROUTE.addproduct,
  productDetail: BASE_ROUTE.productDetail,
};

export const PublicScreens = {
  PageNotFound: "*",
  Login: "/",
  ForgotPassword: "/forgot-password",
  SetPassword: "/set-password",
};
