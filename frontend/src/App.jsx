
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import {Route, Routes,useLocation} from "react-router-dom";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./context/AuthProvider";
import Createors from "./pages/Createors";
import { Toaster } from "react-hot-toast";
import UpdateBlog from "./dashboard/UpdateBlog";
import Detail from "./pages/Detail";
import { useNavigate } from "react-router-dom";

function App() {
  const Navigate=useNavigate()
  const location = useLocation();
const hideNavbarFooter=["/dashboard","/login","/register"].includes(location.pathname);
const { blogs, isAuthenticated } = useAuth();
console.log(blogs);
  return (
    <div >
      {!hideNavbarFooter && <Navbar/>}
   
      <Routes>
      <Route
          exact
          path="/"
          element={isAuthenticated === true ? <Home /> : <Navigate to={"/login"} />}
        />
    <Route exact path="/blogs" element={<Blogs/>} />
    <Route exact path="/about" element={<About/>} />
    <Route exact path="/contact" element={<Contact/>} />
    <Route exact path="/creators" element={<Createors/>} />
     <Route exact path="/login" element={<Login/>} />
    <Route exact path="/register" element={<Register/>} />
    <Route exact path="/dashboard" element={<Dashboard/>} />

    <Route exact path="/blog/update/:id" element={<UpdateBlog/>}/>
    <Route exact path="/blog/:id" element={<Detail/>}/>
      </Routes>
      <Toaster />
   {!hideNavbarFooter && <Footer/>} 
    </div>
  )
}

export default App;
