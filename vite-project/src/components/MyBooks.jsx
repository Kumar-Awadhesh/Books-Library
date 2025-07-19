import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";



function MyBook(){
    const [myBook, setMyBook] = useState([]);
    const [userName, setUserName] = useState(false);
    const navigate = useNavigate();


    const homePage = () => {
        navigate('/')
    }

    function isTokenExpire(token){
           try {
             const decode = jwtDecode(token);
             const current_time = Date.now() / 1000;
             return decode.exp < current_time
           }
            catch (err) {
                return true;
           }
        }
    
       
        useEffect(() => {
            const user = JSON.parse(localStorage.getItem("user"));
            if( user && !isTokenExpire(user.token)){
               setUserName(user)
            }
            else{
                localStorage.removeItem("user");
                setUserName("");
                navigate('/')
            }
        },[])


        const MyBook = async() => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                console.log(user.token)
                const myBooks = await axios.get("https://books-library-p0pv.onrender.com/myBooks",{
                    headers:{
                        Authorization: `Bearer ${user?.token}`
                    }
                })
                if(myBooks?.data?.book){
                    setMyBook(myBooks.data.book)
                }
                else{
                    alert("Book not found !");
                }
                
            } 
            catch (err) {
                console.log("catch error", err)    
            }
        }

        useEffect(() => {
            MyBook()
        },[])
    

    return(
        <>
         <main className="myBook-container">
            <nav className="navbar">
                <div onClick={homePage} className='logo-title-container'>
                    <img className='img-logo' src="/images/library-logo.png" alt="official logo" />
                    <h1 className='title'>My Library</h1>
                </div>
                <div className="user-name" >
                    <img src="https://cdn-icons-png.freepik.com/512/694/694652.png" alt="profile-icon" />
                    <h4>{userName.name}</h4>
                </div>
            </nav>
            {
                myBook.map((book, index)=> (
                    <div className="book-card-container" key={index}>
                        <div className="myBook-card">
                            <h2>Title: {book.title}</h2>
                            <p>Status: {book.status}</p>
                            <p>Rating: {book.rating}</p>
                        </div>
                    </div>
                ))   
            }
         </main>
        </>
    )
}

export default MyBook