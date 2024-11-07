import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import bgVideo from '../assets/sakura.mp4'
import bg from '../assets/ai-generated-8471388_1280.jpg'

import axios from "axios"

interface users {
  name: string
  password: string
  email: string
  noHp: string
}


function Register() {
  const [name, setName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [noHp, setNoHp] = useState<string>('08')
  const navigate = useNavigate()
  const [time, setTime] = useState(new Date());

  const handleRegister = async () => {

    if (!name || !password || !email || !noHp) {
      alert("Isi Formulir Terlebih Dahulu")
    }

    const data: users = {
      name,
      password,
      email,
      noHp
    }

    try {
      const response = await axios.post(`https://testing-api-production-b5a3.up.railway.app/users/register`, data)
      console.log(response.data)
      setName("")
      setPassword("")
      setEmail("")
      setNoHp('08')
      alert('akun berhasil di daftarkan')
      navigate('/login')
    } catch (err) {
      console.log('terjadi kesalahan saat mendaftar', err)
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
      id="box-login"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: '0 0 50px cyan'
      }}
      className="bg-slate-300 font-serif mt-[100px] w-[90%] h-auto pt-[20px] text-white ml-5 border-[1px] rounded-[10px] border-cyan-300 text-center " >
      <video
        src={bgVideo}
        id='bg-login'
        autoPlay
        loop
        muted
        className='object-cover '
      />


      <h1 className="font-semibold text-[20px]">JAMBANCHILAGO <br />
        Enterprise</h1>
      <ul className="flex justify-center items-center w-full h-16 space-x-[-1px] " >
        <li
          onClick={() => navigate("/login")}
          style={{ boxShadow: '0 0 2px black' }}
          className="text-center font-extralightss hover:bg-black hover:text-cyan-500  w-[100px] border-[1px] p-2 border-black border-r-0 " >Login</li>
        <li
          style={{ background: "linear-gradient(to right, #00ffff, #008080)", boxShadow: '0 0 2px black' }}
          className="bg-[#] font-extralight text-center  w-[100px] p-2 border-l-0 border-[1px] border-black ">
          Register
        </li>
      </ul>


      {/* form register */}
      <label className='capitalize font-extralight '>username</label>
      <br></br>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="name..."
        className="w-[63%] focus:bg-black mb-3 border-[1px]  text-white border-black rounded-[3px] bg-cyan-600 placeholder:text-white p-[0.5px] placeholder:opacity-70 placeholder:capitalize placeholder:text-[14px]  pl-2  "
      />
      <br></br>
      <label className='capitalize font-extralight '>password</label>
      <br></br>
      <input
        type="text"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="password"
        className="w-[63%] focus:bg-black border-[1px] mb-3 text-white border-black rounded-[3px] bg-cyan-600 placeholder:text-white p-[0.5px] placeholder:opacity-70 placeholder:capitalize placeholder:text-[14px]  pl-2  "
      />
      <br></br>
      <label className='capitalize font-extralight '>email</label>
      <br></br>
      <input
        type="text"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="email"
        className="w-[63%] focus:bg-black border-[1px] mb-3 text-white border-black rounded-[3px] bg-cyan-600 placeholder:text-white p-[0.5px] placeholder:opacity-70 placeholder:capitalize placeholder:text-[14px]  pl-2  "
      />
      <br></br>
      <label className='capitalize font-extralight '>noHp</label>
      <br></br>
      <input
        type="text"
        value={noHp}
        onChange={(event) => setNoHp(event.target.value)}
        placeholder="NoHp"
        className="w-[63%] focus:bg-black border-[1px] text-white border-black rounded-[3px] bg-cyan-600 placeholder:text-white p-[0.5px] placeholder:opacity-70 placeholder:capitalize placeholder:text-[14px]  pl-2  "
      />
      <br></br>
      <button
        id="Register-btn"
        type="button"
        onClick={handleRegister}
        className=" rounded-[5px] p-1 w-[85%] font-extralight  mt-6 text-neutral-950 text-[18px] hover:bg-black hover:text-cyan-500  " >Register</button>

      <p className="h-7" ></p>

      <h1
        style={{ textShadow: '0 0 20px white' }}
        className="relative top-[-550px] text-[30px] font-semibold text-cyan-400">
        {currentTime}
      </h1>
    </div >
  )
}

export default Register
