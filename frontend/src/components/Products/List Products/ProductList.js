import React, { useEffect, useState } from "react";
import "./productList.scss";
import axios from "axios";
import del from "../../../assets/delete-icon.png"
import edit from "../../../assets/edit-icon.png"
import { Link } from "react-router-dom";
import toast,{Toaster} from "react-hot-toast";
const ProductList = () => {
  const [showProducts, setShowProducts] = useState([]);

  useEffect(() => {
    handleShowProducts();
    
  }, []);
   
    const handleShowProducts=()=>{
      const headers = {
        'Content-Type': 'application/json', 
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      };
      axios
      .get("http://localhost:5000/allProducts", {headers})
      .then((res) => {
        setShowProducts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      
    }
    

      const handleDelete=(id)=>{
        const headers = {
          'Content-Type': 'application/json', 
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
        };
        axios.delete(`http://localhost:5000/deleteProducts?_id=${id}`,{headers})
        .then(() => {
         handleShowProducts();
         toast.success("Product Successfully Deleted!")
          })
        .catch((err) => {
          console.log(err);
        });
      }
  
      const handleSearch=(e)=>{
        const key = e.target.value;
        const headers = {
          'Content-Type': 'application/json', 
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`
        };
        if(key){
          axios.get(`http://localhost:5000/searchProduct/${key}`, {headers})
          .then((res)=>{
              setShowProducts(res.data)
              console.log(res.data)
            })
            .catch((err)=>{
              console.log(err)
            })
        }else{
          handleShowProducts();
        }
      }
  

  return (
    <>
      <section className="product-list">
        <div className="heading">
          <h1>ALL PRODUCTS</h1>
        </div>
        <div className="search-bar">
          <input type="text" name="text" onChange={handleSearch} placeholder="Search Products"/>
        </div>
        <table>
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Company</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
          {
  Array.isArray(showProducts.products) && showProducts.products.length > 0 && showProducts.products.map((product, index) => (
    <tr key={product._id}>
      <td>{index + 1}</td>
      <td>{product.productName}</td>
      <td>{product.price}</td>
      <td>{product.category}</td>
      <td>{product.companyName}</td>
      <td><img src={del} alt="" onClick={()=> handleDelete(product._id)}/></td>
      <td><Link to={`/update/${product._id}`}><img src={edit} alt="" /></Link></td>
    </tr>
  ))
}

          </tbody>
        </table>
      </section>
    </>
  );
};

export default ProductList;
