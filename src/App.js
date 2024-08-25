import logo from "./logo.svg";
import "./App.css";
import Login from "./component/Login/Login";
import SignUp from "./component/SignUp/SignUp";
import UserLayout from "./component/UserLayout/UserLayout";
import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import Home from "./Pages/Home/Home";
import BlogAdd from "./Pages/BlogAdd/BlogAdd";
import UserBlog from "./Pages/UserBlog/UserBlog";

// Authorization component to check token
const Authorization = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<Authorization />}>
          <Route path="/" element={<UserLayout />}>
            <Route path="/edit-blog/:id" element={<BlogAdd />} />
            <Route path="/edit-blog" element={<BlogAdd />} />
            <Route path="/userBlogs" element={<UserBlog />} />
            <Route index element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
