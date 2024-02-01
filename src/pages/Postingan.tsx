import axios from "axios"
import React, { useState } from "react"
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom"


interface UsersPost {
  nama_instansi: string
  nama_pekerjaan: string;
  bidang_pekerjaan: string;
  penuh_waktu: string;
  paruh_waktu: string;
  magang: string;
  kontrak: string;
  harian: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  deskripsi: string;
  gaji: string;
  skils: string;
  minimal_pendidikan: string;
  pengalaman_kerja: string;
  [key: string]: string
}

function Postingan() {
  const [file, setFile] = useState<File | null>(null)
  const [nama_instansi, setNama_instansi] = useState('')
  const [nama_pekerjaan, setNama_pekerjaan] = useState('')
  const [bidang_pekerjaan, setBidang_pekerjaan] = useState('')
  const [penuh_waktu, setPenuh_waktu] = useState('')
  const [paruh_waktu, setParuh_waktu] = useState('')
  const [magang, setMagang] = useState('')
  const [kontrak, setKontrak] = useState('')
  const [harian, setHarian] = useState('')
  const [provinsi, setProvinsi] = useState('')
  const [kabupaten, setKabupaten] = useState('')
  const [kecamatan, setKecamatan] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [gaji, setGaji] = useState('')
  const [skils, setSkils] = useState('')
  const [minimal_pendidikan, setMinimal_pendidikan] = useState('')
  const [pengalaman_kerja, setPengalaman_kerja] = useState('')
  const user_id = localStorage.getItem('user_id')
  const navigate = useNavigate()

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     setFile(event.target.files[0])
  //   }
  // }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const dataPost: UsersPost = {
      nama_instansi,
      nama_pekerjaan,
      bidang_pekerjaan,
      penuh_waktu,
      paruh_waktu,
      magang,
      kontrak,
      harian,
      provinsi,
      kabupaten,
      kecamatan,
      deskripsi,
      gaji,
      skils,
      minimal_pendidikan,
      pengalaman_kerja
    }

    // Aturan validasi: penuh_waktu, paruh_waktu, magang, kontrak, harian boleh kosong
    const allowedEmptyFields = ['penuh_waktu', 'paruh_waktu', 'magang', 'kontrak', 'harian'];
    const isDataPostValid = Object.keys(dataPost).every(key => {
      if (allowedEmptyFields.includes(key)) {
        return true; // Field diizinkan kosong
      } else {
        return Boolean(dataPost[key]); // Field yang lain harus diisi
      }
    });




    if (file || isDataPostValid) {
      const formData = new FormData()
      if (file) {
        formData.append("file", file)
      }

      for (const key in dataPost) {
        if (Object.prototype.hasOwnProperty.call(dataPost, key) && dataPost[key]) {
          formData.append(key, dataPost[key].toString());
        }
      }


      try {
        await axios.post(`http://localhost:3000/users/postingan/${user_id}`, formData)
        console.log('success')
        alert("Postingan berhasil dikirim!")
        navigate('/home')
        setFile(null)
      } catch (err) {
        console.log('terjadi masalah saat memposting', err)
        alert('terjadi masalah')
      }
    } else {
      alert('Lengkapi Data Terlebih Dahulu')
    }
  }

  const detailDanJenisPekerjaa = [
    {
      title: 'bidang pekerjaan',
      nameLabel: 'pilih bidang kerja',
      onChange: setBidang_pekerjaan
    },
    {
      title: 'nama pekerjaan',
      nameLabel: 'masukkan nama pekerjaan/posisi',
      onChange: setNama_pekerjaan
    },
  ]

  const tipePekerjaan = [
    {
      namaLabel: 'penuh waktu',
      onChecked: setPenuh_waktu,
      value: 'penuh waktu',
      name: 'tipe pekerjaan'
    },
    {
      namaLabel: 'paruh waktu',
      onChecked: setParuh_waktu,
      value: 'paruh waktu',
      name: 'tipe pekerjaan'
    },
    {
      namaLabel: 'magang',
      onChecked: setMagang,
      value: 'magang',
      name: 'tipe pekerjaan'
    },
    {
      namaLabel: 'kontrak',
      onChecked: setKontrak,
      value: 'kontrak',
      name: 'tipe pekerjaan'
    },
    {
      namaLabel: 'harian',
      onChecked: setHarian,
      value: 'harian',
      name: 'tipe pekerjaan'
    },
  ]


  const lokasiPekerjaan = [
    {
      title: 'provinsi',
      nameLabel: 'pilih provinsi',
      onChange: setProvinsi
    },
    {
      title: 'kabupaten',
      nameLabel: 'pilih kabupaten',
      onChange: setKabupaten
    },
    {
      title: 'kecamatan',
      nameLabel: 'pilih kecamatan',
      onChange: setKecamatan
    },
  ]


  const listPersyaratanKerja = [
    {
      title: 'skil yang dibutuhkan',
      nameLabel: 'Cari skill',
      onchange: setSkils
    },
    {
      title: 'Pendidikan minimal yang dibutuhkan',
      nameLabel: 'minimal pendidikan',
      onchange: setMinimal_pendidikan
    },
    {
      title: 'penglaman kerja',
      nameLabel: 'pengalaman',
      onchange: setPengalaman_kerja
    },
  ]





  const listLangkah = [
    {
      title: 'Langkah 1',
      cara: 'Daftar akun JPC'
    },
    {
      title: 'Langkah 2',
      cara: 'Pasang lowongan kerja'
    },
    {
      title: 'Langkah 3',
      cara: 'Mulai menerima pelamar'
    }
  ]




  return (
    <div className="w-full text-center font-serif h-auto " >
      <nav
        style={{ boxShadow: '0 0 20px cyan' }}
        className="bg-cyan-800 text-white p-[10px] pl-[5px] fixed w-full z-50 mt-[-40px] "  >
        <p
          onClick={() => navigate('/home')}
          className="text-[27px] p-2 hover:text-rose-600 cursor-pointer w-[50px] ml-1" >
          <  FaArrowLeft />
        </p>
        <p className="text-center mt-[-37px] text-[20px] font-serif text-white  " >JPC</p>

      </nav>


      <div className="relative top-10">
        <h1 className="text-white text-[30px] mt-10 font-semibold font-sans ">Pasang Iklan lowongan <br></br>
          kerja anda <span className="text-cyan-300">sekarang!</span></h1>
        <h3 className="text-[13px] pt-3 text-white font-extralight  ">Dapatkan para pencari lowongan kerja <br></br>
          secara gratis di seluruh indonesia</h3>
      </div>



      {/* bagian form */}
      <div
        className="text-cyan-400 w-full pl-[-5px] pr-[20px]capitalize rounded-[10px]  relative top-4 " >
        <ul className="flex relative top-8 space-x-4 pt-10" >
          <li className="text-[25px] relative -top-8 font-serif" >

            <form onSubmit={handleSubmit} >

              {/* nama instansi/ tempat kerja */}
              <h1 className="text-[23px] capitalize font-semibold mb-4 ">Nama instansi/tempat kerja</h1>
              <textarea
                onChange={(e) => setNama_instansi(e.target.value)}
                placeholder="masukkan nama instansi/tempat kerja"
                className={`h-[26px] ml-1 bg-cyan-600 mb-8 border-[1.5px] border-white placeholder:text-white placeholder:text-[15px] resize-none active:overflow-hidden  text-black text-[15px] pt-2 pb-6 w-[90%] pl-1 placeholder:text-opacity-70 placeholder:capitalize  rounded-[4px] focus:bg-black focus:text-white `}
              />

              {/* detail dan jenis pekerjaan */}
              <h1 className="text-[23px] capitalize font-semibold mb-4 ">Detail dan Jenis pekerjaan</h1>
              {detailDanJenisPekerjaa.map((item, key) => (
                <div className="" >
                  <h2 className="text-[16px] text-left ml-5 text-white pl-1 capitalize ">{item.title}</h2>
                  <textarea
                    key={key}
                    placeholder={item.nameLabel}
                    onChange={(e) => item.onChange(e.target.value)}
                    style={{ boxShadow: '0 0 4px black' }}
                    className={`h-[26px] ml-1 bg-cyan-600 mb-2 border-[1.5px] border-white placeholder:text-white placeholder:text-[15px] resize-none active:overflow-hidden  text-black text-[15px] pt-2 pb-6 w-[90%] pl-1 placeholder:text-opacity-70 placeholder:capitalize  rounded-[4px] focus:bg-black focus:text-white `} />
                </div>
              ))}

              {/* tipe pekerjaan */}
              <h1 className="font-semibold text-[23px] capitalize mt-5  ">tipe pekerjaan</h1>
              {tipePekerjaan.map((item, key) => (
                <div key={key} className="inline justify-center items-center text-[17px] text-white" >
                  <label htmlFor={item.value} className="ml-1 capitalize"> {item.namaLabel} </label>
                  <input
                    id={item.value}
                    value={item.value}
                    name={item.name}
                    type="radio"
                    onChange={(e) => item.onChecked(e.target.value)}
                  />
                </div>
              ))}


              {/* lokasi */}
              <h1 className="text-[23px] mt-7 font-semibold capitalize ">Lokasi</h1>
              {lokasiPekerjaan.map((item, key) => (
                <div className="" >
                  <h2 className="text-[16px] text-left ml-5 text-white pl-1 capitalize ">{item.title}</h2>
                  <textarea
                    key={key}
                    placeholder={item.nameLabel}
                    onChange={(e) => item.onChange(e.target.value)}
                    style={{ boxShadow: '0 0 4px black' }}
                    className={`h-[26px] ml-1 bg-cyan-600 mb-2 border-[1.5px] border-white placeholder:text-white placeholder:text-[15px] resize-none active:overflow-hidden  text-black text-[15px] pt-2 pb-6 w-[90%] pl-1 placeholder:text-opacity-70 placeholder:capitalize rounded-[4px] focus:bg-black focus:text-white `} />
                </div>
              ))}

              {/* gaji  */}
              <div className="mt-5" >
                <h1 className="pb-3 text-[23px] capitalize font-semibold">berapa gaji bulanannya?</h1>
                <input
                  onChange={(e) => setGaji(e.target.value)}
                  placeholder="Rp"
                  className={`h-[26px] ml-1  bg-cyan-600 mb-2 border-[1.5px] border-white  placeholder:text-white placeholder:text-[15px] resize-none active:overflow-hidden  text-black text-[15px] p-4 w-[90%] placeholder:text-opacity-70 placeholder:capitalize  rounded-[4px] focus:bg-black focus:text-white  `}
                />
              </div>

              {/* persyaratan kerja */}
              <h1 className="text-[23px] font-semibold mb-4 mt-6 capitalize ">persyaratan kerja</h1>
              {listPersyaratanKerja.map((value, key) => (
                <div key={key}>
                  <h2 className="text-[16px] text-left ml-5 text-white pl-1 capitalize ">{value.title}</h2>
                  <textarea
                    key={key}
                    placeholder={value.nameLabel}
                    onChange={(e) => value.onchange(e.target.value)}
                    style={{ boxShadow: '0 0 4px black' }}
                    className={`h-[26px] ml-1 bg-cyan-600 mb-2 border-[1.5px] border-white placeholder:text-white placeholder:text-[15px] resize-none active:overflow-hidden  text-black text-[15px] pt-2 pb-6 w-[90%] pl-1 placeholder:text-opacity-70 placeholder:capitalize rounded-[4px] focus:bg-black focus:text-white `} />
                </div>
              ))}

              {/* deskripsi pekerjaan */}
              <div className="mt-6 w-[90%] ml-4 ">
                <h1 className="font-semibold text-[23px] capitalize pb-3 ">Deskripsi pekerjaan</h1>
                <textarea
                  placeholder="Deskripsikan pekerjaan anda"
                  onChange={(e) => setDeskripsi(e.target.value)}
                  className="w-[100%] ml-[5px] border-[1.5px] border-white resize-none rounded-[3px] placeholder:text-opacity-70 placeholder:text-white text-black focus:bg-black focus:text-white bg-cyan-500 text-[15px] h-[100px] font-serif p-2 "
                />
              </div>


              {/* <label htmlFor="fileInput" ><ImAttachment /></label>
              <input id="fileInput" type="file" onChange={handleFileChange} className="text-rose-600 relative hidden -top-6 " /> */}

              <p className="text-[10px] text-left pl-7 pt-4  text-sky-300 "><span className="text-white">dengan mendaftar saya menyetujui</span> <br></br>
                ketentuan penggunaankebijakan dan privasi NQQ
              </p>
              <br></br>
              <button
                id="button-post"
                className={`border-[1.5px] text-[20px] bg-slate-600 active:animate-ping text-center w-[60%]  mb-10 ml-[2px] hover:bg-black font-serif font-semibold  border-white rounded-[10px] `} type="submit"  >
                Ajukan
              </button>
            </form>
          </li>
        </ul>
      </div>


      {/* daftar postingan yang sudah di upload user
      <div className="bg-black w-[95%] ml-2 mt-5 rounded-xl ">
        hello world
      </div> */}


      <div
        className="w-full h-auto p-2 bg-cyan-400 relative mt-10  mb-44 text-start ">
        <h1
          style={{ borderBottomRightRadius: '20px' }}
          className="bg-black w-[70%] text-white  ">Cukup dengan 3 langkah :</h1>

        {listLangkah.map((item, key) => (
          <div key={key} className="mt-5 mb-5 " >
            <h2 className="text-[25px] font-bold  ">{item.title}</h2>
            <h3 className="text-[17px]">{item.cara}</h3>
          </div>
        ))}



      </div>

    </div>
  )
}

export default Postingan
