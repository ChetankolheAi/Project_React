import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
function Signup() {

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;

    // const [users, setUsers] = useState([]);

    const ChangeValues = (args) => {
        const copyOfUser = { ...user };

        copyOfUser[args.target.name] = args.target.value;

        setUser(copyOfUser);
    };

    const Signup1 = (e) => {
        e.preventDefault();

        if(user.username=="" || user.email=="" || user.password==""){
            toast.info("Enter the details bro !!");
            return;
        }
        else if(user.password)
        axios.post(SERVER_URL+"/signup",user).then((res)=>{
            toast.success(res.data.message);
            navigate("/login")
            return;
        }).catch((err)=>{
            console.log(err);
            toast.error(err.message);
            return;
        })

        // console.log(user);
      
    };

    return (
        <div className="min-h-screen bg-gray-300 flex justify-center items-center">

            <form
                onSubmit={Signup1}
                className="w-[560px] bg-white rounded-xl p-6"
            >

                <h2 className="text-3xl font-bold text-center mb-8">
                    Signup
                </h2>

                <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={ChangeValues}
                    placeholder="Enter Username"
                    className="w-full px-3 py-3 bg-gray-200 rounded-md 
                    outline-none focus:ring-2 focus:ring-blue-400 
                    focus:bg-white transition"
                />

                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={ChangeValues}
                    placeholder="Enter Email"
                    className="w-full px-3 py-3 bg-gray-200 rounded-md 
                    outline-none focus:ring-2 focus:ring-blue-400 
                    focus:bg-white transition mt-6"
                />

                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={ChangeValues}
                    placeholder="Enter Password"
                    className="w-full px-3 py-3 bg-gray-200 rounded-md 
                    outline-none focus:ring-2 focus:ring-blue-400 
                    focus:bg-white transition mt-6"
                />
                <div className="flex items-center justify-start mt-8">

                    <button
                        type="submit"
                        className="bg-blue-300 hover:bg-blue-400 
                        px-8 py-3 rounded-md transition"
                    >
                        Signup
                    </button>

                    <p className="text-gray-600 ml-5">
                        Already a user?{" "}
                    
                        <Link to="/login" className="text-blue-500 font-semibold hover:underline">Login</Link>
                    </p>

                </div>

            </form>

        </div>
    );
}

export default Signup;