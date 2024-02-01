import { useEffect, useState } from "react"
import { users } from "./Home"
import axios from "axios"
import { VscLocation } from "react-icons/vsc"
import { formatDistanceToNow, parseISO } from "date-fns"
import { useNavigate } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"
import { BsBookmarkPlusFill, BsFillBookmarkCheckFill } from "react-icons/bs"


function Bookmark() {
  const [userData, setUserData] = useState<users[]>([])
  const userId: any = localStorage.getItem("user_id")
  const Navigate = useNavigate()
  const accessToken = localStorage.getItem('access_token')

  useEffect(() => {
    const interval = setInterval(handleUserData, 1000);
    return () => {
      clearInterval(interval)
    };
  }, [])

  const handleUserData = async () => {
    const response = await axios.get('http://localhost:3000/users')
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
    <div>


      <nav
        style={{ boxShadow: '0 0 20px cyan' }}
        className="bg-cyan-800 text-white p-[10px] pl-[5px] fixed w-full z-50 "  >
        <p
          onClick={() => Navigate('/home')}
          className="text-[27px] p-2 hover:text-rose-600 cursor-pointer w-[50px] ml-1" >
          <  FaArrowLeft />
        </p>
        <p className="text-center mt-[-37px] text-[20px] font-serif text-white  " >JPC</p>

      </nav>

      {userData.map((value, key1) => (
        <div key={key1} className=''>
          {value.postings.map((dataPost, key2) => {
            let timesNow = parseISO(dataPost.created_at.toString())
            let formatTimes = formatDistanceToNow(timesNow, { addSuffix: true })
            let timesValue = formatTimes.replace("about", "")
            const showValidate1 = dataPost.bookmark.length > 0
            const showValidate2 = dataPost.bookmark.find((bookmark) => bookmark.userId == userId)
            const statusBook = dataPost.bookmark.find((bookmark) => bookmark.bookmarkStatus === true && bookmark.userId == userId)
            return (
              <div>
                {showValidate1 && showValidate2 ? (
                  <div key={key2}
                    style={{ boxShadow: '0 0 5px cyan' }}
                    className='bg-cyan-800 bg-opacity-80 border-[1px] mb-[30px] relative top-24 border-cyan-400 w-[92%] ml-4 rounded-[12px] text-white  ' >
                    <ul
                      style={{ textShadow: '0 0 10px black' }}
                      className=' p-[4px] pb-3'>
                      <li className='capitalize font-semibold pl-2 text-[22px] '>{dataPost.nama_pekerjaan}</li>
                      <li className='text-right mt-[-23px] pr-2 opacity-100 text-[15px]'>{dataPost.gaji ? dataPost.gaji : "gaji tidak ditampilkan"}</li>
                    </ul>

                    <ul className='pl-[60px] text-[20px]'>
                      <li className='-ml-6'>{dataPost.nama_pekerjaan}</li>
                      <li className='text-[14px] mb-3 flex mt-2 -ml-10 '><span className='mt-[3px] mr-1'><VscLocation /></span>{dataPost.provinsi}</li>
                    </ul>

                    <button onClick={() => Navigate(`/home/postingan/${dataPost.postId}`)} type='button' className='text-[15px] hover:text-black  hover:bg-sky-400 hover:border-black active:animate-ping bg-black mb-2 p-[3px] w-auto pr-2 pl-2 border-[1px] border-white ml-5  rounded-[5px] '>Detail</button>

                    <ul>
                      <li className='text-[16px] pb-2 opacity-80 mt-[5px] ml-[20px] w-[170px] '>{timesValue}</li>
                      {/* <li className='text-[25px] mt-[-25px] ml-[200px] '><AiFillEye /></li> */}
                      <li
                        onClick={() => handleBookmark(dataPost.postId, dataPost.postId)}
                        className={`text-[30px] cursor-pointer mt-[-40px] pb-4 ml-[300px] `}>
                        {!statusBook ? (
                          <p className='text-white hover:text-black active:animate-ping ' >
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
                ) : null}

              </div>
            )
          })}
        </div>
      ))}

    </div>
  )
}

export default Bookmark
