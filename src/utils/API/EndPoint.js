//BASE URL for All API
export const BASE_URL = "http://localhost:8080/";

//USERS END POINT
export const LIST_ADMIN_USERS = "user/getAllUsers";

export const USER_DETAILS = 'user';

export const CREATE_ADMIN_USERS = "user/saveUsers";

export const EDIT_ADMIN_USERS = "user/update/";

export const DISABLE_ADMIN_USERS = "user/editstatus";

export const DELETE_ADMIN_USER = "user/delete/";

export const GET_ROLES = "role/getAllRoles";

export const MODIFY_BASIC_DETAILS = "user/modifiybasicdetailsbyId";

export const MODIFY_ROLE_DETAILS = "user/modifyuserRole";

//ORDER ENDPOINT
export const LIST_ORDER = "order/getAllOrders";

export const CREATE_ORDER = "order/add";

export const EDIT_ORDER = "order/update/";

export const DELETE_ORDER = "order/delete/";

export const SEARCH_ORDER = "order/"

export const FILTER_ORDER = "order/search/status"

//PRODUCT ENDPOINT
export const LIST_PRODUCT = "product/getAllProducts";

export const LIST_PRODUCT_UNITS = "product/getAllPackaging";

export const CREATE_PRODUCT = "product/new/";

export const EDIT_PRODUCT = "product/update/";

export const DELETE_PRODUCT = "product/delete/";

export const SEARCH_PRODUCT = "product/";

export const GET_BRANDS = "product/getAllBrand";

export const GET_UNITS = "product/getAllUnits";

export const GET_PACKAGING = "product/getAllPackaging";

export const GET_CATEGORY = "product/getAllCategory";

export const GET_WEIGHT_UNITS = "product/getAllWeights";

//CUSTOMER ENDPOINT
export const LIST_CUSTOMER = "customer/getAllCustomers";

export const CUSTOMER_BY_ID = "customer"

export const ADD_CUSTOMER = "customer/saveCustomers";

export const EDIT_CUSTOMER = "customer/update";
