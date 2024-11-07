import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import bgVideo from '../assets/sakura.mp4'
import bg from '../assets/space-8211769_1280.png'
// import merak from '../assets/bulu-merak.jpg'

export interface userDto {
  name: string,
  password: string
}

function Login() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [time, setTime] = useState(new Date());


  const handleLogin = async () => {

    !name || !password ? alert("masukkan username/password") : ""


    const data: userDto = {
      name,
      password,
    }

    try {
      const response = await axios.post('https://testing-api-production-b5a3.up.railway.app/users/login', data)
      if (response.data) {
        alert('your logged In!')
        localStorage.setItem('secretKey', 'utawl0705200420040507')
        localStorage.setItem('access_token', response.data.token)
        localStorage.setItem("user_id", response.data.user.id)
        navigate('/home')
      } else {
        alert('username/password salah, silakan coba kembali')
      }
      setName('')
      setPassword('')
    } catch (err) {
      console.log('login gagal', err)
      alert("username/password anda salah")
    }
  }

  // set time
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const currentTime = time.toLocaleTimeString("id-ID", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
  });


  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: '0 0 50px cyan',
        textShadow: '0 0 6px black'
      }}
      id="box-login"
      className="bg-slate-300  font-serif mt-[100px] w-[90%] h-auto pt-[20px] ml-5 border-[1px] rounded-[10px] border-cyan-300 text-center text-white" >
      <video
        src={bgVideo}
        id='bg-login'
        autoPlay
        loop
        muted
        className='object-cover '
      />

      <h1
        style={{ textShadow: '0 0 10px cyan' }}
        className="font-semibold text-[20px]">JAMBANCHILAGO <br />
        Enterprise</h1>
      <ul className="flex justify-center items-center w-full h-16 space-x-[1px] " >
        <li
          style={{ background: "linear-gradient(to right, #00ffff, #008080)", boxShadow: '0 0 2px black' }}
          className="text-center font-extralightss w-[100px] border-[1px] p-2 border-black border-r-0 " >Login</li>
        <li
          onClick={() => navigate("/register")}
          style={{ boxShadow: '0 0 2px black' }}
          className="bg-[#] font-extralight text-center hover:bg-black hover:text-cyan-500  w-[100px] p-2 border-l-0 border-[1px] border-black ">
          Register
        </li>
      </ul>


      {/* form register */}
      <label className='capitalize  font-semibold '>username</label>
      <br></br>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="name..."
        className="w-[63%] mb-3 border-[1px] text-white focus:bg-black border-black rounded-[3px] bg-cyan-600 placeholder:text-white p-[0.5px] placeholder:opacity-70 placeholder:capitalize placeholder:text-[14px]  pl-2  "
      />
      <br></br>
      <label className='capitalize font-semibold '>password</label>
      <br></br>
      <input
        type="text"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="password"
        className="w-[63%] border-[1px] mb-3 focus:bg-black text-white border-black rounded-[3px] bg-cyan-600 placeholder:text-white p-[0.5px] placeholder:opacity-70 placeholder:capitalize placeholder:text-[14px]  pl-2  "
      />
      <button
        id="Login-btn"
        type="button"
        onClick={handleLogin}
        className=" rounded-[5px] p-1 w-[85%]   mt-6 font-semibold text-[18px] text-white  hover:text-cyan-500  " >Login</button>


      <p className="h-7" ></p>
      <h1
        style={{ textShadow: '0 0 20px white' }}
        className="relative bottom-[-100px] text-[30px] font-semibold text-cyan-400">
        {currentTime}
      </h1>
    </div>
  )
}

export default Login