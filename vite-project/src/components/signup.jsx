import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";


function Authentication(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const userRegistration = async() => {
        const userData = {
            name: name,
            email: email,
            password: password
        }
        if(!name || !email || !password){
            alert("all fields mandatory !")
            return;
        }

        const register = await axios.post("http://localhost:3211/auth/register", userData)
        alert(register.data.msg);
        setName("");
        setEmail("")
        setPassword("");
        navigate('/')
    }

    return(
        <>
        <main className="signupPage-container">
            <div className="register-title"><h1>Register to My Library</h1></div>
            <div className="signup-form">
            <input type="text" placeholder="Enter your name" value={name} onChange={((e)=>setName(e.target.value))}/> <br />
            <input type="text" placeholder="Enter your email" value={email} onChange={((e)=>setEmail(e.target.value))}/> <br />
            <input type="password" placeholder="Enter your password" value={password} onChange={((e)=>setPassword(e.target.value))}/> <br />
            <button onClick={userRegistration}>Register</button>
        </div>
        </main>
        </>
    )

}

export default Authentication