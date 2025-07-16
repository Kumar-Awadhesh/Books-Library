import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

import axios from "axios"


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const userLogin = async() => {

        const userData = {
            email: email,
            password: password
        }
        if(!email || !password){
            alert("all fields are mandatory!");
            return;
        }

        const loginData = await axios.post("http://localhost:3211/auth/userLogin", userData)
        if(!loginData.data.token){
            alert(loginData.data.msg);
            setEmail("");
            setPassword("");
            return;
        }
        const user = {
            name:loginData.data.user.name,
            token:loginData.data.token
        }
        localStorage.setItem("user", JSON.stringify(user));
        alert("Login Successfully!");
        setEmail("");
        setPassword("")
        console.log(user.name)
        navigate("/")
        return;
    }

    return(
        <>
        <main className="loginPage-container">
            <div className="login-title-container"><h1>Login to My Library</h1></div>
            <div className="login-form-container">
                <input type="text" placeholder="Enter your email" value={email} onChange={((e)=>setEmail(e.target.value))}/> <br />
                <input type="password" placeholder="Enter your password" value={password} onChange={((e)=>setPassword(e.target.value))}/> <br />
                <button onClick={userLogin}>Login</button>
            </div>
        </main>
        </>
    )
}

export default Login