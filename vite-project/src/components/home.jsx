import { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css'


function Library(){
    const [books, setBooks] = useState([]); // set books state as empty array.
    const [loading, setLoading] = useState(true); // set loading state as true by default.
    const [auth_btn, setAuth_btn] = useState(true); // set auth_btn state as true by default.


    const signupPage= () => {

    }

    const loginPage = () => {

    }

    const fetchBooks = async() => {
        const book = await axios.get("http://localhost:3211/books")
        console.log(book.data.book)
        setBooks(book.data.book)
        setLoading(false);
    }

    useEffect(() => {
        fetchBooks()
    }, [])

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
            </nav>
            <div className="book-section">
                <h2>What's You Gonna Read Today ?</h2>
                {
                !loading &&
                books.map((book, index) => (
                    <div className="book-container" key={index}>
                        <div>
                            <div className="cover-img-container"><img src={`http://localhost:3211${book.image}`} alt="cover-image" /></div>
                            <div className="book-card">
                                <h2>{book.title}</h2>
                                <p>by {book.author}</p>
                                <p>Available: {book.availability}</p>
                            </div>
                            <div className="read-btn-container"><button>Want to read.</button></div>
                        </div>
                    </div>
                ))
                }
            </div>
        </main>
        </>
    )
}

export default Library