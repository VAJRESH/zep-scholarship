import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import UserRegistration from "./components/UserRegistration";
import Registration from "./components/Registration";
import Options from "./components/Options";
import AdminDashboard from "./components/AdminDashboard";
import UserDetail from "./components/UserDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/options" element={<Options />} />
        <Route path="/admin/users/:id" element={<UserDetail />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
