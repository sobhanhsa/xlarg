"use client"

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import Image from "next/image";
import styles from "./editorComp.module.css";
import { useEffect, useMemo, useRef, useState } from "react";

// import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css"

import dynamic from "next/dynamic";

import LoadingComponent from "@/components/loadingComponent/LoadingComponent";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fireBaseApp } from "@/utils/firebase";
import { slugify } from "@/utils/slugify";
import { toast } from "react-toastify";
import { categoryType } from "@/types/catType";
import CategorySelect from "@/components/categorySelect/CategorySelect";
import { PostType } from "@/types/postType";

const storage = getStorage(fireBaseApp);

const UpdateEditor = ({post,cats}:{
    post:PostType,
    cats:categoryType[]
}) => {
    
    
    const ReactQuill = useMemo(
        () => 
        dynamic(() => import('react-quill'), { ssr: false })
        ,
        []
    );
        
    
    const uploadToastId = useRef(null);
    
    const [file,setFile] = useState<File | null>(null)
    const [open , setOpen] = useState<boolean>(false)
    const [value,setValue] = useState(post.desc)
    const [media,setMedia] = useState<null | string>(post.img);
    const [title,setTitle] = useState(post.title);
    const [category,setCategory] = useState<null | string>(post.catSlug);

    const {status} = useSession()
    
    const router  = useRouter()
    
    const fileInputHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setFile(e.target.files[0]);
    };
    
    useEffect(() => {
        const upload = () => {

            
            if (!(file?.name)) return;
            
            setMedia("loading");
            
            // Create the file metadata
            /** @type {any} */
            
            const metadata = {
                contentType: 'image/jpeg'
            };

            const uniqueName = new Date().getTime() + file?.name;
            
            // Upload file and metadata to the object 'images/mountains.jpg'
            const storageRef = ref(storage, 'images/' + uniqueName );
            const uploadTask = uploadBytesResumable(storageRef, file as File, metadata);
            
            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                
                if (!(uploadToastId.current)) {
                    uploadToastId.current = toast
                    .warn("uploading image") as any;
                }
                
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                            break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                            }
                        }, 
                        (error) => {
                            uploadToastId.current = null;
                            // A full list of error codes is available at
                            // https://firebase.google.com/docs/storage/web/handle-errors
                            switch (error.code) {
                                case 'storage/unauthorized':
                                    // User doesn't have permission to access the object
                                    uploadToastId.current && toast
                                    .update(uploadToastId.current,{
                                        type:"error",
                                        render:"you don't havee access to this image"
                                    })
                                    break;
                                    case 'storage/canceled':
                                        // User canceled the upload
                                        uploadToastId.current && toast
                                        .update(uploadToastId.current,{
                                            type:"error",
                                            render:"you canceled upload"
                                        })
                                        break;
                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            uploadToastId.current && toast
                            .update(uploadToastId.current,{
                                    type:"error",
                                    render:"unknown error occurred"
                                })
                                break;
                            }
                        }, 
                        () => {
                            // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        uploadToastId.current = null;
                        console.log('File available at', downloadURL);
                        setMedia(downloadURL);
                        uploadToastId.current && toast
                        .dismiss(uploadToastId.current)
                        toast.success("image succesfully uploaded!")
                    });
                }
                );
                
            };
            
            file && upload();
    },[file])
        
    useEffect(() => {
        if (status === "unauthenticated") router.push("/login");
    },[]);
        
    const submitHandler = async() => {
        !category && toast.error("each post should have a category");
        const slug  = slugify(title);
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`,{
                method:"POST",
                body:JSON.stringify({
                    slug,
                    title,
                    desc:value,
                    img:media,
                    catSlug:category,
                })
            });
            toast.success("your post successfully published!");
            setTimeout(
                () => router.push("/posts/"+slug)
            ,1500);
        }catch(e:any&Error) {
            toast.error(e.message);
        };
    };  
        
        
    return ( 
        <div className={styles.container}>
            <input type="text" placeholder="Title" className={styles.input}
            onChange={ e => setTitle(e.target.value)}/>
            <CategorySelect 
                defCatSlug={post.catSlug} 
                cats={cats}
                cb={(newCat) => setCategory(
                    (prevCat) => {
                        if (prevCat !== newCat) return newCat;
                        return null
                    }
            )}/>
            <div className={styles.editor}>
                <button className={styles.button} onClick={() => { setOpen(prev => !prev) }}>
                    <Image src="/plus.png" alt="" width={16} height={16}/>
                </button>
                
                { open && 
                    (
                        <div className={styles.add}>
                            <input
                                type="file" 
                                id="image"
                                onChange={fileInputHandler}
                                style={{display:"None"}}
                            />
                            <button 
                                className={styles.addButton} 
                                // onClick={() => { setOpen(prev => !prev) }}
                            >
                                <label htmlFor="image">
                                    <Image src="/image.png" alt="" width={16} height={16}/>
                                </label>
                            </button>            
                            <button className={styles.addButton} 
                                // onClick={() => { setOpen(prev => !prev) }}
                            >
                                {/* <label htmlFor="image"> */}
                                    <Image src="/external.png" alt="" width={16} height={16}/>
                                {/* </label> */}
                            </button>            
                            <button className={styles.addButton} 
                                // onClick={() => { setOpen(prev => !prev) }}
                                >
                                {/* <label htmlFor="image"> */}
                                    <Image src="/video.png" alt="" width={16} height={16}/>
                                {/* </label> */}
                            </button>                       
                        </div>
                    )
                }
                <ReactQuill className={styles.textArea} theme="bubble" value={value} onChange={setValue} placeholder="tell youre storry"/>
            </div>
            <button className={styles.publish} onClick={submitHandler} 
                disabled={media === "loading"}>
                publish
            </button>
        </div>
    );
}

export default UpdateEditor;