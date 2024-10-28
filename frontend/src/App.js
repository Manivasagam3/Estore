import './App.css';
import Home from './Components/Home';
import Product from './Components/Product';
import Admin from './Admin/Admin';
import Mens from './Components/Mens';
import Womens from './Components/Womens';
import Kids from './Components/Kids';
import Nav from './Components/Nav';
import Login from './Register/Login';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Footer from '../src/Footer/Footer'

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path="/men" element={<Mens />} />
        <Route path="/women" element={<Womens />} />
        <Route path='/kid' element={<Kids />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/product' element={<Product />} />
        <Route path='/login' element={<Login />} />
         
      </Routes>
      
      <Footer/>
    </Router>
  );
}

export default App;
