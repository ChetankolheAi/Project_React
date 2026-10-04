import express, { response } from "express";
import cors from 'cors'
import {Login,Signup} from './controller.js'
import verifyToken from "./middleware/middleware.js";

const app = express();

app.use(express.json());
app.use(cors())   



app.post("/login",Login)
app.post("/signup", Signup);
app.get("/profile",verifyToken,(req, res) => {
    res.status(200).json({
        message: "Profile accessed successfully"
    });
});


app.listen(5000, () => {
  console.log("Server Running on port 5000");
});