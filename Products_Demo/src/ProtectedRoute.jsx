import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute({ children}) {
  const navigate = useNavigate();
  const isLoggedIn = 
   sessionStorage.getItem("isLoggedIn") === "true";
  
  

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  return children;
}

export default ProtectedRoute;