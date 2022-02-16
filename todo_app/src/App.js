import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Details from "./components/Main/tasks/details";
import Admin from "./components/Main/admins/admin";
import Manage from "./components/Main/admins/manage";
import SeeByAdmin from "./components/Main/admins/seeByAdmin";

function App() {
  const user = localStorage.getItem("token");
  const is_admin = localStorage.getItem("is_admin");

  return (
    <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      {user && <Route path="/details/:id" exact element={<Details />} />}
      {user && is_admin === "yes" && (
        <Route path="/admin" exact element={<Admin />} />
      )}
      {/* {user && is_admin === "yes" && (
        <Route path="/manage" exact element={<Manage />} />
      )} */}
      {user && is_admin === "yes" && (
        <Route path="/usertask/:id" exact element={<Manage />} />
      )}
      {user && is_admin === "yes" && (
        <Route path="/seebyadmin/:id" exact element={<SeeByAdmin />} />
      )}
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/details/:id" element={<Navigate replace to="/login" />} />
      <Route path="/usertask/:id" element={<Navigate replace to="/login" />} />
      <Route
        path="/seebyadmin/:id"
        element={<Navigate replace to="/login" />}
      />
      <Route path="/admin" element={<Navigate replace to="/login" />} />
      <Route path="/manage" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
