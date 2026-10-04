import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Launcher from "./Launcher";
import "./css/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Launcher />
    <ToastContainer position="top-right" autoClose={3000} />
  </BrowserRouter>
);