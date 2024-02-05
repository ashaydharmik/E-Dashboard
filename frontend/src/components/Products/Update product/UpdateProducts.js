import React, { useEffect, useState } from 'react'
import axios from "axios";
import toast,{Toaster} from "react-hot-toast";
import { useParams, useNavigate } from 'react-router-dom';


const UpdateProducts = () => {
    const initialValue = { productName: "", price: "", category:"" , companyName:"" }
const [productData, setProductData] = useState(initialValue)
const params = useParams();
const navigate = useNavigate();

    const changeHandler = (e) => {
        const { name, value } = e.target;
      setProductData((prevData)=>({
        ...prevData,
        [name]:value,
      }))
      };

      useEffect(() => {
        // Check if 'id' parameter is present
        if (!params.id) {
          // Redirect to another page if 'id' is not present
          navigate('/');
        } else {
          // Fetch data when 'id' is present
          getProductData();
        }
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [params.id]);

const getProductData=()=>{
  const headers = {
    'Content-Type': 'application/json', 
  "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
  };
    axios.get(`http://localhost:5000/singleProduct/${params.id}`,{headers})
    .then((res)=>{
        setProductData(res.data.availableProduct)
        console.log(res.data.availableProduct)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  
  
  
const handleUpdateProduct=(e)=>{
  e.preventDefault();
    const headers = {
        'Content-Type': 'application/json', 
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      };
axios.put(`http://localhost:5000/updateProducts/${params.id}`,productData,{headers})
.then((res)=>{
    setProductData(res.data.availableProduct)
    console.log("product updated")
    navigate('/')

})
.catch(err=>{
    console.log(err)
    toast.error("Invalid Data")
})
}
      
  return (
    <>
     <section className="register-container">
        <div className="heading">
          <h1>Update PRODUCTS</h1>
        </div>
        <div className="form-container">
          <form onSubmit={handleUpdateProduct}>
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
              <button type="submit">UPDATE</button>
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

export default UpdateProducts