import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loader from "../../sharedComponents/CustomLoader/Loader";
import { AdminScreens, PublicScreens } from "./RoutePath";
import Dashboard from "../../components/Dashboard/Dashboard";
import Orders from "../../components/Orders/Orders";
import Product from "../../components/Product/Product";
import Reports from "../../components/Reports/Reports";
import Customers from "../../components/Customers/Customers";
import Settings from "../../components/Settings/Settings";

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
            path={AdminScreens.orders}
            element={AdminRoute(<Orders />)}
          />
          <Route
            path={AdminScreens.customers}
            element={AdminRoute(<Customers />)}
          />
           <Route
            path={AdminScreens.product}
            element={AdminRoute(<Product />)}
          />
           
           <Route
            path={AdminScreens.report}
            element={AdminRoute(<Reports />)}
          />
          <Route
            path={AdminScreens.settings}
            element={AdminRoute(<Settings />)}
          />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default Routing;
