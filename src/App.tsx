import Home from "./pages/Home"
import { Routes, Route, useNavigate } from 'react-router-dom'
import Karyawan from "./pages/Karyawan"
import Login from "./pages/Login"
import Postingan from "./pages/Postingan"
import Register from "./pages/register"
import DetailPost from "./pages/DetailPost"
import Bookmark from "./pages/Bookmark"
import { useEffect } from "react"



function App() {

  const navigate = useNavigate()

  useEffect(() => {
    const isLoggedIN = localStorage.getItem("secretKey")
    const currenPath = window.location.pathname;

    if (isLoggedIN === "utawl0705200420040507") {
      if (currenPath === '/login' || currenPath === '/register') {
        navigate('/home', { replace: true })
      }
    } else {
      if (
        currenPath !== "/login" &&
        currenPath !== "/register"
      ) {
        navigate("/login", { replace: true });
      }
    }

  })

  


  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/karyawan" element={<Karyawan />} />
        <Route path="/home/bookmark" element={<Bookmark />} />
        <Route path="/home/instansi" element={<Postingan />} />
        <Route path="/home/postingan/:postId" element={<DetailPost />} />


      </Routes>
    </>
  )
}

export default App
