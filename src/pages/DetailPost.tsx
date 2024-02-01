import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { FaArrowLeft } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { FaDollarSign } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { FaHourglassHalf } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { parseISO, formatDistanceToNow } from 'date-fns'
import { MdOutlineWatchLater } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";


interface Post {
  nama_instansi: string
  nama_pekerjaan: string,
  bidang_pekerjaan: string,
  penuh_waktu: string,
  paruh_waktu: string,
  magang: string,
  kontrak: string,
  harian: string,
  provinsi: string,
  kabupaten: string,
  kecamatan: string,
  deskripsi: string,
  gaji: string,
  skils: string,
  minimal_pendidikan: string,
  pengalaman_kerja: string,
  fileName: string,
  created_at: Date
}

function DetailPost() {
  const param = useParams().postId?.toString()
  const [dataPost, setDataPost] = useState<Post | null>(null)
  const [timeAgo, setTimeAgo] = useState<string>('');
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(getDataPost, 100)
    return () => {
      clearInterval(interval)
    }
  }, [])


  const getDataPost = async () => {
    const response = await axios.get(`http://localhost:3000/users/post/${param}`)
    setDataPost(response.data)

    // calculate time 
    const parsedDate = parseISO(response.data.created_at.toString())
    const formattedTimeAgo = formatDistanceToNow(parsedDate, { addSuffix: true, includeSeconds: true })
    setTimeAgo(formattedTimeAgo.replace('about', 'diposting',))

  }

  const icons = [
    {
      icon: <FaDollarSign />,
      text: dataPost?.gaji
    },
    {
      icon: <FaBuilding />,
      text: dataPost?.bidang_pekerjaan
    },
    {
      icon: <FaHourglassHalf />,
      text: dataPost?.penuh_waktu ? dataPost.penuh_waktu : dataPost?.paruh_waktu ? dataPost.paruh_waktu : dataPost?.magang ? dataPost.magang : dataPost?.harian ? dataPost.harian : dataPost?.harian ? dataPost.harian : null
    },
    {
      icon: <FaGraduationCap />,
      text: dataPost?.minimal_pendidikan
    },
    {
      icon: <FaBagShopping />,
      text: dataPost?.pengalaman_kerja
    },
    {
      icon: <IoLocationOutline />,
      text: [dataPost?.provinsi, ", ", dataPost?.kabupaten, ", ", dataPost?.kecamatan]
    },
  ]


  return (
    <div className="text-white w-full h-auto ">

      <nav
        style={{ boxShadow: '0 0 20px cyan' }}
        className="bg-cyan-800 text-white p-[10px] pl-[5px] fixed w-full z-50 "  >
        <p
          onClick={() => navigate('/home')}
          className="text-[27px] p-2 hover:text-rose-600 cursor-pointer w-[50px] ml-1" >
          <  FaArrowLeft />
        </p>
        <p className="text-center mt-[-37px] text-[20px] font-serif text-white  " >JPC</p>

      </nav>


      {/* baris pertama */}
      <div>
        <ul className=" w-[30%] text-white  relative top-20 flex p-5 " >
          <li className="text-yellow-400 text-[45px] bg-white w-[60px] h-[60px] rounded-[60px] ">
            {dataPost?.fileName && dataPost.fileName.length > 0 ? (
              <img
                src={`http://localhost:3000/users/postingan/${dataPost?.fileName}`}
                className="w-[60px] h-[60px] rounded-[60px] "
              />
            ) : (
              ""
            )}

          </li>
        </ul>
        <ul className=" text-white mt-2 font-serif  w-[50%] h-[100px] ml-[90px] " >
          <li className="text-[25px] ml-1">{dataPost?.bidang_pekerjaan}</li>
          <li className="text-[14px] flex text-sky-400 font-extralight   ">
            <p className="text-[17px]" ><TiTick /></p>
            {dataPost?.nama_instansi}
          </li>
        </ul>
      </div>

      {/* baris kedua */}
      <div className="text-white w-[90%] ml-[18px] border-t-[1px] -mt-5 pt-4 " >
        <ul className="ml-[-15px]">
          {icons.map((item, key) => (
            <li key={key} className="flex ml-4 " >
              <p className="mb-3">{item.icon}</p>
              <p className="-mt-1 ml-2" >{item.text}</p>
            </li>
          ))}
        </ul>

        {/*time  */}
        <div className="flex space-x-2 relative top-4">
          <h1><MdOutlineWatchLater /></h1>
          <h2 className="text-[12px] text-white text-opacity-70 ">{timeAgo}</h2>
        </div>

        {/* persyaratan */}
        <ul className="relative top-10 w-[100%] border-t-[1px] border-white " >
          <h1 className="font-semibold text-[20px] text-cyan-500 ">Persyaratan</h1>
          <li>{dataPost?.pengalaman_kerja}</li>
          <li>{dataPost?.minimal_pendidikan}</li>
        </ul>

        {/* skills */}
        <ul className="relative top-14" >
          <h1 className="font-semibold text-[20px] text-cyan-500 ">Skills</h1>
          <li>{dataPost?.skils}</li>
        </ul>

        {/* pengelola loker */}
        <ul className="relative top-20 pb-20 " >
          <h1 className="font-semibold text-[20px] text-cyan-500 ">Deskripsi pekerjaan</h1>
          <li>{dataPost?.deskripsi}</li>
        </ul>

      </div>



    </div>
  )
}

export default DetailPost
