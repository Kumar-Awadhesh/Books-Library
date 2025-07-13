import {Routes, Route} from 'react-router-dom'
import './App.css'
import Library from './components/home'
import Authentication from './components/authentication'
import MyBook from './components/MyBooks'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Library/>}/>
      <Route path='/authentication' element={<Authentication/>}/>
      <Route path='/myBook' element={<MyBook/>}/>
    </Routes>
  )
}

export default App
