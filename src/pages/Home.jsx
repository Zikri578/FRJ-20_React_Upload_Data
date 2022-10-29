import React from 'react'
import { storage } from "../config/FirebaseConfig"
import { ref, uploadBytes, listAll } from "firebase/storage"
import { useState, useEffect } from 'react';

export default function Home() {

    // state menampung preview image
    const [imagePrev, setImagePrev] = useState("")

    // state untuk menampilkan image data
    const [imageData, setImageData] = useState([])

    // untuk refresh halaman
    const [refresh, setRefresh] = useState(false);

    // preview image before upload
    const handlePreviewImage = (i) => {

        // console.info(i)
        const file = i.target.files[0];
        // console.info(file)

        const reader = new FileReader()

        // mereload image 
        reader.onload = (res) => {
            // console.info(res.target.result)
            setImagePrev(res.target.result)
        }

        // menampilkan image
        reader.readAsDataURL(file)
    }

    // handle upload to firebase
    const handleUpload = (e) => {

        // stop reload page
        e.preventDefault();

        // menangkap file dari form dengan tag id
        const upload = e.target.Image.files[0]

        // membuat reference
        const uploadRef = ref(storage, "/upload_data/" + upload.name)

        // proses upload image
        uploadBytes(uploadRef, upload)
            .then((res) => {
                // reset ketika sudah di submit maka gambarnya akan hilang
                setImagePrev("")
                setRefresh(!refresh)

                // output ketika file berhasil masuk ke firebase
                console.info("File berhasil di upload")
            })
            .catch((err) => {
                console.error(err)
            })
    }

    // handle all view image
    const handleView = async () => {

        // menampung data dari forEach
        let newArray = []

        // ref dari folder upload_data
        const sfRef = ref(storage, "/upload_data")

        await listAll(sfRef)
            .then((res) => {
                res.items.forEach((q, index) => {
                    console.info(q.name)
                    newArray.push({
                        id: index,
                        url: `https://firebasestorage.googleapis.com/v0/b/upload-data-e0862.appspot.com/o/upload_data%2F${q.name}?alt=media&token=72fa4460-28f3-4725-a5d9-9d93b6409f8f`
                    })
                })
                // console.info("")
            })
            .catch((err) => {
                console.error(err)
            })

        return newArray
    }

    // component life cycle
    useEffect(() => {
        handleView()
            .then((res) => {
                setImageData(res)
                //console.info(res)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [refresh])


    return (
        <div>

            <form action="" className='w-full h-screen flex flex-col justify-center items-center gap-5 p-6' onSubmit={handleUpload} autoComplete='off'>

                <h1 className='text-2xl'>Halaman Upload Image</h1>

                <div className='flex gap-2 justify-between items-center'>
                    <label htmlFor="Image" className="flex items-center px-4 gap-2">Image</label>
                    <input type="file" id="Image" className='h-10 px-3 border-[1px] border-gray-300 rounded-md w-[250px]' accept='image/jpg, image/jpeg, image/png, image/gif' onChange={handlePreviewImage} />
                </div>

                <div>
                    <img src={imagePrev} alt="image prev" width={200} height={200} />
                </div>

                <div className='flex gap-2 justify-between items-center'>
                    <button type='submit' className='h-10 w-[120px] bg-blue-400 text-white rounded-md hover:bg-blue-700'>Submit</button>
                </div>

            </form>

            {/* menampilkan data */}
            {imageData.map((w) => {
                return (
                    <div className='flex flex-col-reverse items-center rounded-md justify-center gap-2'>
                        <img src={w.url} alt={w.name} key={w.id} className="w-20 h-20 object-cover m-2.5 " />
                    </div>
                )
            })}
            {/* akhir menampilkan data */}

        </div>
    )
}
