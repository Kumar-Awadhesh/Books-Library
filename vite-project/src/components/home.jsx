import { useState, useEffect } from "react";
import axios from 'axios';
import '../app.css'


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
            <div>
                {
                    !loading &&
                    books.map((book, index) => (
                        <div className="book-container" key={index}>
                            <div>
                                <div><img src={`http://localhost:3211${book.image}`} alt="" /></div>
                                <div>
                                    <h2>{book.title}</h2>
                                    <p>by {book.author}</p>
                                    <p>Available: {book.availability}</p>
                                </div>
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