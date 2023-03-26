import React, {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    }, []);

    const handleLogin = async ()=>{
        console.log(email,password)

        let result = await fetch('https://e-dashboard-backend.onrender.com/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);  
         if(result.auth){
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));
            navigate("/");
         }else{
            alert("Please enter correct details");
         }

    }

  return (
    <div className=" container d-flex mt-4 flex-column justify-content-center align-items-center">
      <h1>Login</h1>
      <div className="container mt-2 w-50">
        <div class="form-group mb-3">
          <label for="exampleInputEmail1">Email Address</label>
          <input
            type="email"
            class="form-control mt-2 border-primary"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Email"
            onChange={(e)=>{
                setEmail(e.target.value);
            }}
            value={email}
          />
        </div>
        <div class="form-group mb-3">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control mt-2 border-primary"
            id="exampleInputPassword1"
            placeholder="Enter Password"
            onChange={(e)=>{
                setPassword(e.target.value);
            }}
            value={password}

          />
        </div>

        <button type="button" class="btn mt-4"
                  style={{ backgroundColor: "skyblue" }}
                  onClick={handleLogin}
>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
