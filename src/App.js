import { lazy } from "react";

// import Loader from "./sharedComponents/CustomLoader/Loader";

const Routing = lazy(() => import('./utils/Routing/Routing'));

const App = () => <Routing />

export default App;
