import bg1 from '../assets/loker.jpg'
import bg2 from '../assets/image1.jpg'
import bg3 from '../assets/image3.jpg'
import bg4 from '../assets/image4.jpg'
import bgFooter from '../assets/night-4695490_1280.jpg'
import bgVid from '../assets/126923 (540p).mp4'
import { useEffect, useState } from 'react'
import { BsFillBookmarkCheckFill, BsBookmarkPlusFill, BsInstagram } from "react-icons/bs"
import { users } from '../pages/Home'
import axios from 'axios'
import { VscLocation } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { SiTelegram } from "react-icons/si";
import { MdEmail } from "react-icons/md";


export const Content = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [userData, setUserData] = useState<users[]>([])
  const navigate = useNavigate()
  const userId: any = localStorage.getItem("user_id")
  const accessToken = localStorage.getItem('access_token')


  const listImg = [bg1, bg2, bg3, bg4]

  const changeImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listImg.length);
  }

  useEffect(() => {
    const interval = setInterval(changeImage, 5000);
    const interval2 = setInterval(handleUserData, 1000);
    const intervals = [interval, interval2];
    return () => {
      intervals.forEach(clearInterval)
    };
  }, []);




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

  // icons footer
  const listIconsFooter = [
    {
      ikon: <MdEmail />,
      link: 'mailto:mrehan21062004@gmail.com'
    },
    {
      ikon: <SiTelegram />,
      link: 'https://web.telegram.org/a/#370923291'
    },
    {
      ikon: <BsInstagram />,
      link: 'https://www.instagram.com/m.rehan012/'
    }
  ]



  return (
    <>

      {/* gambar */}
      <div className=' w-full h-[250px]'>
        <h1
          style={{ boxShadow: '0 0 60px black' }}
          className="ml-[9.5px] border-[1px] border-cyan-400 mt-[-270px] w-[95%] -z-30 relative bg-black rounded-[15px]  ">
          <img src={listImg[currentIndex]} alt='' className='rounded-[15px] ' />
        </h1>
      </div>

      <div
        style={{ textShadow: '0 0 10px black' }}
        className="relative ml-[45px] mt-[35px] w-[80%] -z-30 ">
        <p
          style={{ textShadow: '0 0 19px black' }}
          className='italic font-semibold text-center mt-20 text-[#00ffff] capitalize'>"sudah biasa melewati badai, <br /> tidak mungkin tumbang hanya karena gerimis.
          ber kultivasilah sampai kau menerangi semesta yang gelap"</p>

      </div>


      {/* list postingan pekerjaan */}
      <div className='font-serif w-full  h-[200px] relative top-14 '>
        <h1
          style={{ textShadow: '0 0 10px black' }}
          className='ml-6 font-semibold text-cyan-500 capitalize pb-3 text-[19px]   '>List pekerjaan</h1>

        {userData.map((value, key1) => (
          <div key={key1} className=''>
            {value.postings.map((dataPost, key2) => {
              let timesNow = parseISO(dataPost.created_at.toString())
              let formatTimes = formatDistanceToNow(timesNow, { addSuffix: true })
              let timesValue = formatTimes.replace("about", "")
              const statusBook = dataPost.bookmark.find((bookmark) => bookmark.bookmarkStatus === true && bookmark.userId == userId)
              return (
                <div
                  key={key2}
                  style={{ boxShadow: '0 0 5px cyan' }}
                  className='bg-cyan-800 bg-opacity-80 border-[1px] mb-[30px] border-cyan-400 w-[92%] ml-4 rounded-[12px]  ' >
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

                  <button onClick={() => navigate(`/home/postingan/${dataPost.postId}`)} type='button' className='text-[15px] hover:text-black hover:bg-sky-400 hover:border-black active:animate-ping bg-black mb-2 p-[3px] w-auto pr-2 pl-2 border-[1px] border-white ml-5  rounded-[5px] '>Detail</button>

                  <ul>
                    <li className='text-[16px] pb-2 opacity-80 mt-[5px] ml-[20px] w-[170px] '>{timesValue}</li>
                    {/* <li className='text-[25px] mt-[-25px] ml-[200px] '><AiFillEye /></li> */}
                    <li
                      onClick={() => handleBookmark(dataPost.postId, dataPost.postId)}
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

        <video
          src={bgVid}
          id='footer'
          autoPlay
          loop
          muted
          className='object-cover '
        />

        {/* footer */}
        <div
          style={{
            backgroundImage: `url(${bgFooter})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            boxShadow: '0 0 50px cyan'
          }}
          className={`w-full bg-black border-t-[2px] border-cyan-500 h-auto relative `} >
          <ul>
            <li className='text-center font-serif text-[25px] font-semibold pt-4 text-cyan-400 '>JPC Tech</li>
            <li className='text-center text-[12px] w-[90%] mt-3 ml-4 font-serif font-extralight  ' >
              Selamat datang di situs web kami, sebuah platform inovatif yang dirancang khusus untuk memenuhi kebutuhan Anda dalam mencari pekerjaan atau mencari karyawan.
              Kami menyediakan ruang untuk memasang lowongan kerja formal, seperti posisi karyawan untuk perusahaan, namun tidak hanya terbatas pada itu.
              Di sini, Anda juga dapat menemukan peluang pekerjaan untuk posisi non formal seperti kasir, pelayan rumah makan, guru les, dan banyak lagi.
              Kami berkomitmen untuk mempertemukan individu yang mencari pekerjaan dengan peluang yang sesuai dengan keahlian dan preferensi mereka.
              Jelajahi situs kami untuk memanfaatkan berbagai peluang karir yang kami tawarkan, baik bagi pencari kerja maupun perusahaan yang mencari tenaga kerja berkualitas.
              Selamat berkarir dengan kami!<br></br>
              <span className='text-[14px] font-semibold text-cyan-400 ' >Salam JPC !!!!</span>
            </li>
            <li className='text-center mt-3'>
              <h3 className='font-semibold font-serif'>Layanan Pengaduan konsumen</h3>
              <p className='text-[12px]  '>Company Address: Jl.maransi, kec.aie pacah, kel.koto tangah, kota padang, sumatera barat </p>
            </li>
            <li className='flex space-x-2 justify-center text-center mt-3 text-[12px]' >
              <h2>Email Address: </h2>
              <a href="mailto:mrehan21062004@gmail.com" className='text-cyan-400 hover:text-rose-500'>mrehan21062004@gmail.com</a>
            </li>

            {/* ikon  */}
            <ul className='flex justify-center ml-[-20px] items-center' >
              {listIconsFooter.map((data, key) => (
                <li key={key} className='flex space-x-2 mt-6 ml-6 text-[23px]  ' >
                  <a href={`${data.link}`} className='hover:text-rose-500 active:animate-ping ' >{data.ikon}</a>
                </li>
              ))}
            </ul>
            <li className='text-center text-[12px] w-[90%] mt-5 ml-5 font-serif font-extralight '>@2024 PT.Jambanchilago Indonesia</li>
            {/* jasa kami */}
            <li className='' >
              <h1 className='ml-5 mt-10 text-[22px] font-serif font-semibold text-cyan-500 '>Jasa Kami</h1>
              <ul className='ml-5 text-[13px]  w-[140px] space-y-2 capitalize ' >
                <li>Pengembangan Web</li>
                <li>Desain Poster, Pamflet</li>
                <li>Desain Web</li>
                <li>Fitur Web</li>
                <li>Desain Logo</li>
              </ul>
              <li className='inline-block ml-[170px] mt-[-50px] '>
                <h1 className='font-semibold font-serif text-[20px] text-cyan-500 '>Random Quote</h1>
                <p className='text-[15px]'>" Demi masa depan yang indah, <br />
                  Dilarang ada kata menyerah,<br />
                  Gunakan sharingan yang telah kau bangkitkan, <br />
                  untuk menggapai impian dari rasa sakit yang kau rasakan  "
                </p>
              </li>
            </li>
            <li className='text-center mt-28'>@Axes_Jannah WWH</li>
          </ul>
          <p className='w-full h-[20px] ' ></p>
        </div>


      </div>

    </>
  )
}