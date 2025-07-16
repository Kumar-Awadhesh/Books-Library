import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom" 
import {jwtDecode} from 'jwt-decode'
import axios from 'axios';
import '../App.css'


function Library(){
    const [books, setBooks] = useState([]); // set books state as empty array.
    const [loading, setLoading] = useState(true); // set loading state as true by default.
    const [auth_btn, setAuth_btn] = useState(true); // set auth_btn state as true by default.
    const [profile, setProfile] = useState(false) // set profile as false.
    const [username, setUsername] = useState("");
    const navigate = useNavigate();


    const signupPage = async() => {

        navigate('/signup')
    }

    const loginPage = () => {

        navigate('/login')
    }

    const fetchBooks = async() => {
        const book = await axios.get("https://books-library-p0pv.onrender.com/books")
        console.log(book.data.book)
        setBooks(book.data.book)
        setLoading(false);
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    function isTokenExpire(token){
       try {
         const decode = jwtDecode(token);
         const current_time = Date.now() / 1000;
         decode.exp < current_time
       }
        catch (err) {
            return true;
       }
    }

   
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if( user && !isTokenExpire(user.token)){
            setAuth_btn(false);
            setProfile(true);
           setUsername(user.name)
        }
        else{
            localStorage.removeItem("user");
            setProfile(false);
            setAuth_btn(true)
        }
    },[])

    return(
        <>
        <main className="container">
            <nav className="navbar">
                <div className='logo-title-container'>
                    <img className='img-logo' src="/images/library-logo.png" alt="official logo" />
                    <h1 className='title'>My Library</h1>
                </div>

    {/*---------------------------------------------------Login ang sign up button section-------------------------------------------------------*/}
            
            {
            auth_btn && 
            <div className='btn-container'>
                <button onClick={loginPage} className='login-btn'>Login</button>|| 
                <button onClick={signupPage} className='signup-btn'>Signup</button>
            </div>
            }
            {
            profile &&
            <div className="user-name">
                <img src="https://cdn-icons-png.freepik.com/512/694/694652.png" alt="profile-icon" />
                <h4>{username}</h4>
            </div>
            }
            </nav>
            <div className="book-section">
                <h2>What's You Gonna Read Today ?</h2>
                {
                !loading &&
                books.map((book, index) => (
                    <div className="book-container" key={index}>
                        <div>
                            <div className="cover-img-container"><img src={`https://books-library-p0pv.onrender.com${book.image}`} alt="cover-image" /></div>
                            <div className="book-card">
                                <h2>{book.title}</h2>
                                <p>by {book.author}</p>
                                <p>Available: {book.availability}</p>
                            </div>
                            <div className="read-btn-container"><button>Want to read.</button></div>
                        </div>
                    </div>
                )) ||
                <h2>Loading...</h2>
                }
            </div>
        </main>
        </>
    )
}

export default Library