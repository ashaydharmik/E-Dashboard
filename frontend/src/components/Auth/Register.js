import React, { useEffect, useState } from "react";
import "./register.scss";
import axios from "axios";
import toast,{Toaster} from "react-hot-toast";
import {useNavigate} from "react-router-dom"

const Register = () => {
  const initialValue = { username: "", email: "", password: "" };
  const [formData, setFormData] = useState(initialValue);
 const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(()=>{
    const auth = localStorage.getItem("user")
    if(auth){
      navigate("/")
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  
    axios.post("http://localhost:5000/register", formData)
      .then((response) => {
        setFormData(response.data);
       localStorage.setItem("user", JSON.stringify(response.data))
       localStorage.setItem("token", JSON.stringify(response.data.token))
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        console.log("Error during registration:", err);
        toast.error(err.response.data.message);
      });
  };
  

  return (
    <>
      <section className="register-container">
        <div className="heading">
          <h1>Register</h1>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Name"
              value={formData.username}
              onChange={changeHandler}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={changeHandler}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={changeHandler}
              required
            />

            <div className="buttons">
              <button type="submit">SignUp</button>
            </div>
          </form>
        </div>
      </section>
      <Toaster
       toastOptions={{
        style: {
          background: '#363636',
          color: '#fff',
          width:"350px",
          fontSize:"18px"
        }
      }}
      />
    </>
  );
};

export default Register;
