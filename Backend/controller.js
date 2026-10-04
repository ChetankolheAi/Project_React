import connection from './db.js';
import jwt from 'jsonwebtoken';

const secretKey = "dfdfdbcdyf7dffbdcydcbds7f";
const executeLoginQuery = (queryText, request, res ,payload)=>{
    connection.query(queryText,(error, result)=>{

    if (error == null) 
    {
        if (result.length === 0) 
        {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
        
        let token  = jwt.sign(payload,secretKey);

        return res.status(200).json({
            message: "Login Success!",
            user: result[0],
            token : token
        });
    }
    else 
    {
        return res.status(500).json({
            error: error.message
        });
    }

   });
}
const executeSignupQuery = (queryText, req, res) => {

    connection.query(queryText, (error, result) => {

        if (error == null) {

            return res.status(201).json({
                message: "User registered successfully!",
                userId: result.insertId
            });

        } else {

            if (error.code === "ER_DUP_ENTRY") {

                return res.status(409).json({
                    message: "User already exists!"
                });

            }

            return res.status(500).json({
                error: error.message
            });
        }
    });
};
const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("In GET Request");
        let queryText = `SELECT * FROM users WHERE password_hash = '${password}' AND email ='${email}';`;
        const payload = {
            email :email,
            password : password,
            tokenCreatedDateTime : new Date().toString()
        }
        executeLoginQuery(queryText, req, res ,payload);

    } catch (error) {
        console.error("Database Error:", error.message);

        return res.status(500).json({
            error: "Failed to fetch user data"
        });
    }
};


const Signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        console.log("In Post");


        let queryText = `INSERT INTO users (username, email, password_hash) VALUES ('${username}','${email}','${password}');`;
        executeSignupQuery(queryText,req,res)
       

    } catch (err) {
        console.error("Signup Error:", err.message);

        return res.status(400).json({
            error: err.message
        });
    }
};

export { Login, Signup };