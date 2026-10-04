
import { useState } from "react";
import { useNavigate ,Link} from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios'
function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    Email: "",
    Password: "",
  });
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const ChangeValues = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const Login = (e) => {
    e.preventDefault();

    if (user.Name === "") {
      toast.warning("Enter Data First!");
      return;
    }

    if (user.Password === "") {
      toast.warning("Enter the Password!");
      return;
    }

   
      axios.post(SERVER_URL + "/login", {
      email: user.Email,
      password: user.Password
    })
      .then((res)=>{

        toast.success("Login Successful!");

        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("Email", user.Email);
        sessionStorage.setItem("UserName",res.data.user.username);
        sessionStorage.setItem("token", res.data.token);


        window.dispatchEvent(new Event("authChange"));

        navigate("/");
      })
      .catch((err)=>{
          toast.error(
              err.response?.data?.message || "Login failed"
          );
      })
   
     
    

  };

  return (
    <div className="flex flex-col items-center h-[100vh] bg-gray-300 justify-center">

      <form
        onSubmit={Login}
        className="bg-white w-[500px] p-5 flex flex-col rounded-xl pt-5 h-[300px] justify-between"
      >

        <h2 className="font-bold text-center text-2xl pt-4">
          Login
        </h2>

        <input
          type="email"
          name="Email"
          className="mt-3 bg-gray-200 p-2 rounded-sm border-none outline-none"
          placeholder="Enter Email"
          value={user.Email}
          onChange={ChangeValues}
        />

        <input
          type="password"
          name="Password"
          className="mt-3 mb-3 p-2 bg-gray-200 rounded-sm outline-none"
          placeholder="Enter Password"
          value={user.Password}
          onChange={ChangeValues}
        />
         <div className="flex items-center justify-start mt-1">

            <button
                type="submit"
                className="bg-blue-300 hover:bg-blue-400 
                px-8 py-3 rounded-md transition"
            >
                Login
            </button>

            <p className="text-gray-600 ml-2">
              Not a user?{" "}
              
              <Link to="/Signup" className="text-blue-500 font-semibold hover:underline">Signup</Link>
                
            </p>

        </div>
        

      </form>
    </div>
  );
}

export default Login;
