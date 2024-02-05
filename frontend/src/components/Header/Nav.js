import React from 'react'
import  {Link, useNavigate} from "react-router-dom"
import "./nav.scss"
const Nav = () => {
  const auth = localStorage.getItem("user")
    const navigate = useNavigate();
  const handleLogout=()=>{
    if(auth){
      localStorage.clear();
      navigate("/signup")
    }
  }

  return (
    
    <div className='header'>
            
    {
            auth ?       
            <ul>
            <li> <Link to="/" > Products  </Link></li>
            <li> <Link  to="/add" > Add Products </Link></li>
            <li> <Link to="/profile" > Profile  </Link></li>
            <li> <Link to="/signup" onClick={handleLogout} > Logout &nbsp;[{JSON.parse(auth).name}] </Link></li>
            </ul>
            :
           <ul className='register'>
            <li><Link to="/signup" > SignUp  </Link></li>
            <li><Link to="/login" > Login  </Link></li>
           </ul>
  
    }  
   
    </div>
    
    
  )
}

export default Nav