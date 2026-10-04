import { Routes, Route } from "react-router-dom";

import Home from "./Pages/home";
import Navbar from "./Pages/Navbar";
import Login from "./Pages/Login";
import Contactus from "./Pages/Contactus";
import Aboutus from "./Pages/Aboutus";
import ProtectedRoute from "./ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./Pages/Profile";
import Signup from "./Pages/Signup";

function Launcher() {




  return (
    <div>

      <Navbar
        
      />

      <Routes>

        <Route path="/"element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/aboutus" element={<Aboutus />}    />
        <Route path="/contactus" element={<Contactus />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login"  
          element={
            <Login/>
          }/>
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>}/>

      </Routes>

      <ToastContainer
      />

    </div>
  );
}

export default Launcher;