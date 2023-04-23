const ADMIN = '/admin';

export const BASE_ROUTE = {
  dashboard: `${ADMIN}/dashboard`,
  users: `${ADMIN}/users`,
  orders: `${ADMIN}/orders`,
  product: `${ADMIN}/product`,
  report: `${ADMIN}/report`,
  customers: `${ADMIN}/customers`,
  settings: `${ADMIN}/settings`,
};

export const AdminScreens = {
  dashboard: BASE_ROUTE.dashboard,
  users: BASE_ROUTE.users,
  orders: BASE_ROUTE.orders,
  product: BASE_ROUTE.product,
  customers: BASE_ROUTE.customers,
  report: BASE_ROUTE.report,
  settings: BASE_ROUTE.settings,
};

export const PublicScreens = {
    PageNotFound: '*',
    Login: '/',
    ForgotPassword:'/forgot-password',
    SetPassword:'/set-password',
};
