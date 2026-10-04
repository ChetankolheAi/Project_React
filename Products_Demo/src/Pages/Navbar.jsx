import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import axios from "axios";
function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem("isLoggedIn") === "true"
  );
  const [UserName ,setUserName] = useState(()=>
    sessionStorage.getItem("UserName")
  )
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
   

    //This Function Fires as soon as the SessionStorage value changes
    const checkLoginStatus = () => {
      setIsLoggedIn(sessionStorage.getItem("isLoggedIn") === "true");
      setUserName(sessionStorage.getItem("UserName"));
    };

    // Listen for custom event triggered from Login / action components
    window.addEventListener("authChange", checkLoginStatus);

    return () => {
      window.removeEventListener("authChange", checkLoginStatus);
    };
  }, []);

  const Logout = () => {

    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("Email");
    sessionStorage.removeItem("UserName");
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);

    // Notify other listeners if necessary
    window.dispatchEvent(new Event("authChange"));

    toast.success("Logged Out!");
    navigate("/login");
  };
const getProfile = (e) =>{
    e.preventDefault();

    const token = sessionStorage.getItem("token");
      console.log(token)
      axios.get(SERVER_URL+"/profile",{
          headers:{
            Authorization :`Bearer ${token}`
          }
      }).then((res)=>{
          toast.success(res);
          navigate('/profile');
      }).catch((err)=>{
          toast.error(err.message);
      })
  }
  return (
    <div className="navContainer">
      <nav>
        <h3
          className="heading text-2xl font-bold cursor-pointer"
          style={{ color: "white" }}
        >
          Products{" "}
          <strong style={{ color: "gray" }}>
            .
          </strong>
        </h3>

        <ol >
         <Link to="/" className="text-white mr-4 font-bold hover:text-blue-300">
          Home
        </Link>
          <Link to="/aboutus" className="text-white mr-4 font-bold hover:text-blue-300">Aboutus</Link>
          <Link to="/contactus" className="text-white mr-4 font-bold hover:text-blue-300">Contactus</Link>
        </ol>

        {isLoggedIn ? (
          <div className="flex justify-center items-center">
              <h1 className="text-black mr-4 font-bold text-2xl bg-blue-300 px-3 py-1 rounded-sm cursor-pointer" onClick={getProfile}>
                {UserName}
              </h1>
             <button
            className="bg-gray-200 px-3 py-2 rounded-sm text-black font-bold"
            onClick={Logout}
          >
            Logout
          </button>

            
          </div>
           
          
        
         
        ) : (
          <Link to="/login">
            <button
              className="bg-gray-200 px-3 py-2 rounded-sm text-black font-bold"
            >
              Login
            </button>
          </Link>
        )}
      </nav>
    </div>
  );
}

export default Navbar;