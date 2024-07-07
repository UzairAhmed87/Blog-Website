import authService from './appwrite/auth'
import './App.css'
import { useDispatch } from 'react-redux'
import { useState , useEffect } from 'react'
import { login ,logOut } from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL)
const [loading , setLoading] = useState(true)
const dispatch = useDispatch()

useEffect(() => {
  authService.getCurrentUser()
  .then((userData)=>{
    if (userData) {
      dispatch(login({userData}))
    }else{
      dispatch(logOut())
    }
  })
  .finally(()=>setLoading(false))
}, [])

  return !loading ? (
<div>Hello world
<div>
  <Header/>
  <main>
    <Outlet/>
  </main>
  <Footer/>
</div> 
</div>
  ) : null
}

export default App