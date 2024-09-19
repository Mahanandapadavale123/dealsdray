import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import EmployeeTable from "./EmployeeTable";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/employee-table" element={<EmployeeTable />} />
      </Routes>
    </Router>
  );
}

export default App;