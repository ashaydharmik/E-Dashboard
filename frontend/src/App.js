import logo from './logo.svg';
import './App.css';
import Nav from './components/Header/Nav';
import {Routes, Route} from "react-router-dom"
import Footer from './components/Footer/Footer';
import Register from './components/Auth/Register';
import PrivateComponent from './components/PrivateComponent/PrivateComponent';
import Login from './components/Auth/Login';
import AddProducts from './components/Products/Add product/AddProducts';
import ProductList from './components/Products/List Products/ProductList';
import UpdateProducts from './components/Products/Update product/UpdateProducts';
function App() {
  return (
    <div className="App">
     <Nav/>
     <Routes>

      <Route element={<PrivateComponent/>}>
      <Route path='/' element={<ProductList/>}/>
      <Route path='/add' element={<AddProducts/>}/>
      <Route path='/update/:id' element={<UpdateProducts/>} />
      <Route path='/logout' element={<h1> logout component </h1>}/>
      <Route path='/profile' element={<h1>profile component </h1>}/>
      </Route>

      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Register/>}/>
      
     </Routes>
     <Footer/>
    </div>
  );
}

export default App;
