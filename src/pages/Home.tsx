
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose, IoMdNavigate } from "react-icons/io";
import { Link } from 'react-router-dom'
import { Content } from "../components/Content";


export interface users {
  userId: number
  name: string
  password: string
  email: string
  noHp: string
  postings: {
    postId: number
    nama_pekerjaan: string;
    bidang_pekerjaan: string;
    tipe_pekerjaan: string
    sistem_kerja: string;
    provinsi: string;
    kabupaten: string;
    kecamatan: string;
    deskripsi: string;
    gaji: string;
    skils: string;
    minimal_pendidikan: string;
    pengalaman_kerja: string;
    originalName: string
    fileName: string
    filePath: string
    created_at: Date
    bookmark: {
      bookmarkStatus: boolean
      userId: number
      postId: number
      create_at: Date
    }[]
  }[]
}

function Home() {
  const [active, setActive] = useState<boolean>(false)
  const token = localStorage.getItem("access_token")



  const listNavNoLog = [
    {
      title: 'masuk',
      link: '/login'
    },
    {
      title: 'daftar',
      link: '/register'
    },
  ]

  const listNavWithLog = [
    {
      title: 'lowongan kerja',
      link: '/home/karyawan'
    },
    {
      title: 'untuk usahamu',
      link: "/home/instansi"
    },
    {
      title: 'bookmark',
      link: "/home/bookmark"
    },
  ]


  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  return (
    <div className="text-white font-sans h-auto w-full">

      <nav
        style={{ boxShadow: '0 0 20px cyan' }}
        className="bg-cyan-800 text-white p-[10px] pl-[5px] fixed w-full z-50 " >
        <ul className="flex justify-end items-center pt-1 pb-1 bg-transparent space-x-[70px] ">
          <li className="font-semibold font-sans text-[20px]  text-slate-200">
            <h1  >Jambanchilago </h1>
          </li>
          <li
            className={`text-[30px] pr-4 hover:text-black `}>
            <h1
              onClick={() => setActive(!active)}
            >
              {active ? (
                <IoMdClose />
              ) : (
                <GiHamburgerMenu />
              )}
            </h1>
          </li>
        </ul>
      </nav>

      {/* ini ikon whatsapp */}
      <div className="flex justify-end pr-9 pt-[350px] ">
        <h1 className="text-green-500 mt-[200px] fixed text-[40px] ">
          {/* <IoLogoWhatsapp /> */}
        </h1>
      </div>



      <div className={`flex justify-center items-center w-full space-x-20 z-30 capitalize fixed  ${active ? 'mt-[-345px] transition ' : 'mt-[-805px] transitiony'}  `}>
        <ul
          id="navbar-nav"
          style={{ boxShadow: '0 0 255px cyan' }}
          className=" bg-cyan-700 border-[2px] border-t-0 bg-opacity-50  border-cyan-500 mt-[54px] w-[95%]  p-[10px] rounded-b-[11px] rounded-t-none  pt-5" >
          {!token ? (
            listNavNoLog.map((item, key) => (
              <Link key={key} to={item.link}>
                <li
                  id="list-nav"
                  style={{ borderTopLeftRadius: '0px', borderBottomRightRadius: '0px', textShadow: '0 0 10px black' }}
                  className="mb-4 w-[100%] text-center font-semibold  border-[2px] border-l-0 border-r-0  border-cyan-300 font-serif  rounded-[6px] p-2 hover:text-cyan-300 hover:bg-black bg-cyan-800 cursor-pointer active:animate-ping hover:animate-bounce "
                >
                  {item.title}
                </li>
              </Link>
            ))
          ) : (
            listNavWithLog.map((item, key) => (
              <Link key={key} to={item.link}>
                <li
                  id="list-nav"
                  style={{ borderTopLeftRadius: '0px', borderBottomRightRadius: '0px', textShadow: '0 0 10px black' }}
                  className="mb-4 w-[100%] text-center font-semibold  border-[2px] border-l-0 border-r-0  border-cyan-300 font-serif  rounded-[6px] p-2 hover:text-cyan-300 hover:bg-black bg-cyan-800 cursor-pointer active:animate-ping hover:animate-bounce "
                >
                  {item.title}
                </li>
              </Link>
            ))
          )}
        </ul>
      </div>


      <div
        id="navigasiHome"
        className=" bg-cyan-400 w-[50px] h-[50px] ml-10 left-[280px] bottom-20 text-center pl-1 pt-1 rounded-[10px] text-black hover:bg-black hover:text-cyan-400 cursor-pointer text-[40px] fixed z-50  "
        onClick={handleScrollToTop}
      >
        <IoMdNavigate />
      </div>



      {/* content */}
      <Content />




    </div>
  )
}
export default Home
