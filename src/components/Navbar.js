import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    alert("do want close thise session");
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div
    //  className="position-fixed w-100"
    // style={{zIndex:"100",opacity:"1",margin:"0",padding:"0",marginTop:"-25px"}}
    >
      <nav
       className="navbar  navbar-expand-lg bg-body-tertiary p-0"
       >
        <div
          className="container-fluid mt-0 p-3 "
          style={{ backgroundColor: "skyblue" }}
        >
          <img
            className=""
            style={{ width: "40px", background: "", borderRadius: "100%" }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZoQSIx9_0njw81qfrxXM9kp7WBiaFcTUpvw&usqp=CAU"
            alt=""
          />
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          {auth ? (
            <div
              className="collapse navbar-collapse fs-5 mx-4"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link " aria-current="page" to="/">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add">
                    Add Product
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/update/:id">
                    Update Product
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link onClick={logout} className="nav-link" to="/signup">
                    Logout({JSON.parse(auth).name})
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "end",
              }}
            >
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto  mb-2 mb-lg-0">
                  <li>
                    <Link className="nav-link" to="/signup">
                      Sign Up
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
