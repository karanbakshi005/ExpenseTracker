import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Dashboard from "./pages/Dashboard.tsx"; 
const App = () => {
  return ( 
  <>
<Routes>
<Route element={<Layout />}>
<Route path="/" element={<Dashboard />} />
</Route>

</Routes>
  </>);
 
};

export default App;
