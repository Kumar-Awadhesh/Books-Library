import {Routes, Route} from 'react-router-dom'
import './App.css'
import Library from './components/home'
import Authentication from './components/signup'
import Login from './components/login'
import MyBook from './components/MyBooks'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Library/>}/>
      <Route path='/signup' element={<Authentication/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/myBook' element={<MyBook/>}/>
    </Routes>
  )
}

export default App
