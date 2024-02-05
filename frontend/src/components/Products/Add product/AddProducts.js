import React, { useEffect, useState } from 'react'
import axios from "axios";
import toast,{Toaster} from "react-hot-toast";

const AddProducts = () => {
    const initialValue = { productName: "", price: "", category:"" , companyName:"" }
const [productData, setProductData] = useState(initialValue)


    const changeHandler = (e) => {
        const { name, value } = e.target;
      setProductData((prevData)=>({
        ...prevData,
        [name]:value,
      }))
      };

    
     

      const handleAddProducts = (e) => {
        e.preventDefault();
        console.log(productData);
        const userId = JSON.parse(localStorage.getItem("user")).id
        const requestedData = {...productData, userId:userId}
        const headers = {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}` 
          };
        axios.post("http://localhost:5000/addProducts", requestedData,{headers})

          .then((response) => {
            setProductData(initialValue);
            toast.success(response.data.message);
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
          <h1>ADD PRODUCTS</h1>
        </div>
        <div className="form-container">
          <form onSubmit={handleAddProducts}>
            <input
              type="text"
              name="productName"
              placeholder="productName"
              value={productData.productName}
              onChange={changeHandler}
              required
            />
            <input
              type="Number"
              name="price"
              placeholder="price"
              value={productData.price}
              onChange={changeHandler}
              required
            />
            <input
              type="text"
              name="category"
              placeholder="category"
              value={productData.category}
              onChange={changeHandler}
              required
            />
            <input
              type="text"
              name="companyName"
              placeholder="companyName"
              value={productData.companyName}
              onChange={changeHandler}
              required
            />

            <div className="buttons">
              <button type="submit">ADD</button>
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
  )
}

export default AddProducts