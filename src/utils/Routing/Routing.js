import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loader from "../../sharedComponents/CustomLoader/Loader";
import { AdminScreens, PublicScreens } from "./RoutePath";

const LoginPage = lazy(() => import("../../components/Login/LoginPage"));

const ForgotPassword = lazy(() =>
  import("../../components/Login/ForgotPassword")
);

const SetPassword = lazy(() => import("../../components/Login/SetPassword"));

const AdminLayout = lazy(() =>
  import("../../sharedComponents/Layout/Admin/AdminLayout")
);

const UserProfile = lazy(() =>
  import("../../components/UserProfile/UserProfile")
);

const AddUser = lazy(() => import("../../components/UserProfile/AddUser"));

const EditUser = lazy(() => import("../../components/UserProfile/EditUser"));

const Dashboard = lazy(() => import("../../components/Dashboard/Dashboard"));

const Orders = lazy(() => import("../../components/Orders/Orders"));

const Product = lazy(() => import("../../components/Product/Product"));

const AddProduct = lazy(() => import("../../components/Product/AddProduct"));

const ProductDetails = lazy(() =>
  import("../../components/Product/ProductDetails")
);

const Reports = lazy(() => import("../../components/Reports/Reports"));

const Customers = lazy(() => import("../../components/Customers/Customers"));

const AddCustomer = lazy(() =>
  import("../../components/Customers/AddCustomer")
);

const UpdateCustomer = lazy(() =>
  import("../../components/Customers/UpdateCustomer")
);

const Settings = lazy(() => import("../../components/Settings/Settings"));

const OrderDetails = lazy(() => import("../../components/Orders/OrderDetails"));

const AddRole = lazy(() => import("../../components/Settings/AddRole"));

const AdminRoute = (Children) => {
  const token = true;
  if (token) {
    return (
      <AdminLayout>
        <div>{Children}</div>
      </AdminLayout>
    );
  }
};

function Routing() {
  return (
    <Suspense
      fallback={
        <Loader
          loading={true}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      }
    >
      <Router>
        <Routes>
          {/* <Route path={PublicScreens.PageNotFound} element={<PageNotFound />} /> */}
          <Route path={PublicScreens.Login} element={<LoginPage />} />
          <Route
            path={PublicScreens.ForgotPassword}
            element={<ForgotPassword />}
          />
          <Route path={PublicScreens.SetPassword} element={<SetPassword />} />
          <Route
            path={AdminScreens.dashboard}
            element={AdminRoute(<Dashboard />)}
          />
          <Route
            path={AdminScreens.users}
            element={AdminRoute(<UserProfile />)}
          />
          <Route
            path={AdminScreens.adduser}
            element={AdminRoute(<AddUser />)}
          />
          <Route
            path={AdminScreens.edituser}
            element={AdminRoute(<EditUser />)}
          />
          <Route path={AdminScreens.orders} element={AdminRoute(<Orders />)} />
          <Route
            path={AdminScreens.orderdetails}
            element={AdminRoute(<OrderDetails />)}
          />
          <Route
            path={AdminScreens.customers}
            element={AdminRoute(<Customers />)}
          />
          <Route
            path={AdminScreens.addcustomer}
            element={AdminRoute(<AddCustomer />)}
          />
          <Route
            path={AdminScreens.updatecustomer}
            element={AdminRoute(<UpdateCustomer />)}
          />
          <Route
            path={AdminScreens.product}
            element={AdminRoute(<Product />)}
          />
          <Route
            path={AdminScreens.addproduct}
            element={AdminRoute(<AddProduct />)}
          />
          <Route
            path={AdminScreens.productDetail}
            element={AdminRoute(<ProductDetails />)}
          />
          <Route path={AdminScreens.report} element={AdminRoute(<Reports />)} />
          <Route
            path={AdminScreens.settings}
            element={AdminRoute(<Settings />)}
          />
          <Route
            path={AdminScreens.addrole}
            element={AdminRoute(<AddRole />)}
          />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default Routing;
