import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if(auth){
      navigate('/');
    }
  });

  const collectData = async () =>  {
    console.log(name, email, password);
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem("user",JSON.stringify(result.result));
    localStorage.setItem("token",JSON.stringify(result.auth));
    if (result) {
      navigate('/');
    }
  };
  return (
    <div className="container mt-4 d-flex flex-column justify-content-center align-items-center">
      <h1>Register</h1>
      <div className="container mt-2 w-50 ">
        {/* <form> */}
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-control border-primary"
            id="exampleFormControlInput1"
            placeholder="Enter your name here"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control border-primary"
            id="exampleFormControlInput1"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control border-primary"
            id="exampleFormControlInput1"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button
          type="button"
          class="btn"
          style={{ backgroundColor: "skyblue" }}
          onClick={() => {
            collectData();
          }}
        >
          Sign Up
        </button>
        {/* </form> */}
      </div>
    </div>
  );
};

export default SignUp;
