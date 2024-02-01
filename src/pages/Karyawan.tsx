import { useEffect, useState } from "react"
import { users } from "./Home"
import axios from "axios"
import { formatDistanceToNow, parseISO } from "date-fns"
import { useNavigate } from "react-router-dom"
import { VscLocation } from "react-icons/vsc"
import { BsBookmarkPlusFill, BsFillBookmarkCheckFill } from "react-icons/bs"
import { FaArrowLeft } from "react-icons/fa"


function Karyawan() {
  const [userData, setUserData] = useState<users[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const userId: any = localStorage.getItem("user_id")
  const accessToken = localStorage.getItem('access_token')


  useEffect(() => {
    const interval = setInterval(handleUserData, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [searchTerm])

  const handleUserData = async () => {
    const response = await axios.get<users[]>('http://localhost:3000/users')
    setUserData(response.data)
  }


  const handleBookmark = async (postId: any, postinganId: number) => {
    await axios.post(`http://localhost:3000/users/bookmark`,
      {
        postId: postId,
        userId: userId,
        postinganId: postinganId
      }, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    console.log('success')

  }

  return (
    <div className="text-white" >
      <nav
        style={{ boxShadow: '0 0 20px cyan' }}
        className="bg-cyan-800 text-white p-[10px] pl-[5px] fixed w-full z-50 mt-[-70px] "  >
        <p
          onClick={() => navigate('/home')}
          className="text-[27px] p-2 hover:text-rose-600 cursor-pointer w-[50px] ml-1" >
          <  FaArrowLeft />
        </p>
        <p className="text-center mt-[-37px] text-[20px] font-serif text-white  " >JPC</p>

      </nav>


      {/* konten */}
      <h1 className="text-center mt-16 mb-[-15px] text-[20px] font-semibold text-white ">Cari pekerjaan yang anda inginkan</h1>
      <input
        type=""
        placeholder="Cari...."
        value={searchTerm}
        style={{ boxShadow: '0 0 20px white' }}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="relative mb-10 mt-10 w-[90%] ml-5 h-[30px] border-[1px] border-cyan-400 bg-cyan-700 rounded-[8px] pl-3 "
      />
      <div>
        {userData.map((data) => (
          <div>
            {data.postings
              .filter((dataPost) =>
                dataPost.gaji.toLowerCase().includes(searchTerm.toLowerCase()) ||
                dataPost.bidang_pekerjaan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                dataPost.nama_pekerjaan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                dataPost.provinsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                dataPost.kabupaten.toLowerCase().includes(searchTerm.toLowerCase()) ||
                dataPost.kabupaten.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((filteredData, key) => {
                let timesNow = parseISO(filteredData.created_at.toString())
                let formatTimes = formatDistanceToNow(timesNow, { addSuffix: true })
                let timesValue = formatTimes.replace("about", "")
                const statusBook = filteredData.bookmark.find((bookmark) => bookmark.bookmarkStatus === true && bookmark.userId == userId)
                return (
                  <div
                    key={key}
                    style={{ boxShadow: '0 0 5px cyan' }}
                    className='bg-cyan-800 bg-opacity-80 border-[1px] mb-[30px] border-cyan-400 w-[92%] ml-4 rounded-[12px]  '
                  >
                    <ul
                      style={{ textShadow: '0 0 10px black' }}
                      className=' p-[4px] pb-3'>
                      <li className='capitalize font-semibold pl-2 text-[22px] '>{filteredData.nama_pekerjaan}</li>
                      <li className='text-right mt-[-23px] pr-2 opacity-100 text-[15px]'>{filteredData.gaji ? filteredData.gaji : "gaji tidak ditampilkan"}</li>
                    </ul>

                    <ul className='pl-[60px] text-[20px]'>
                      <li className='-ml-6'>{filteredData.nama_pekerjaan}</li>
                      <li className='text-[14px] mb-3 flex mt-2 -ml-10 '>
                        <h1 className='mt-[3px] mr-1'><VscLocation /></h1>
                        <h2 className="w-[200px]">{filteredData.provinsi}, {filteredData.kabupaten}, {filteredData.kecamatan} </h2>
                      </li>
                    </ul>

                    <button onClick={() => navigate(`/home/postingan/${filteredData.postId}`)} type='button' className='text-[15px] hover:text-black hover:bg-sky-400 hover:border-black active:animate-ping bg-black mb-2 p-[3px] w-auto pr-2 pl-2 border-[1px] border-white ml-5  rounded-[5px] '>Detail</button>

                    <ul>
                      <li className='text-[16px] pb-2 opacity-80 mt-[5px] ml-[20px] w-[170px] '>{timesValue}</li>
                      {/* <li className='text-[25px] mt-[-25px] ml-[200px] '><AiFillEye /></li> */}
                      <li
                        onClick={() => handleBookmark(filteredData.postId, filteredData.postId)}
                        className={`text-[30px] cursor-pointer mt-[-40px] pb-4 ml-[300px] `}>
                        {!statusBook ? (
                          <p className='text-white hover:text-black active:animate-ping  ' >
                            <BsBookmarkPlusFill />
                          </p>
                        ) : (
                          <p className='text-cyan-300 hover:text-black active:animate-ping ' >
                            <BsFillBookmarkCheckFill />
                          </p>
                        )}

                      </li>
                    </ul>


                  </div>
                )
              })}

          </div>
        ))}
      </div>




    </div>


  )
}

export default Karyawan
