import styles from "./navbar.module.scss";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const navigate = useNavigate();

  const goto = () => {
    navigate("/");
  };

  const gotoAdmin = () => {
    if (localStorage.getItem("is_admin") === "yes") {
      navigate("/admin");
    } else {
      alert("You are not allowed to do this!");
    }
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <ul>
          <li class="nav-item">
            <span onClick={goto}>Brand</span>
          </li>
        </ul>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <span onClick={goto}>Home</span>
            </li>
            <li class="nav-item">
              <li className="nav-item">
                <span onClick={gotoAdmin}>Admin</span>
              </li>
            </li>
          </ul>
          <ul>
            <li>
              <span className="contact" onClick={handleLogout}>
                Logout
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
