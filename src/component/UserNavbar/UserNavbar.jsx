import "./navbar.css";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const Navigate = useNavigate();


  const logout = () => {
    localStorage.removeItem("token");
    Navigate("/login")
}

  const Home = () => {
    Navigate("/");
  };
  const User = () => {
    Navigate("/userBlogs");
  };
  const Adduser = () => {
    Navigate("/edit-blog");
  };
  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link"onClick={Home}>
            Home
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link"  onClick={User}>
            User blog
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" onClick={Adduser}>
            New blog
          </a>
        </li>
      </ul>
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" onClick={logout}>
            Logout
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>

    </>
  );
};

export default Navbar;
