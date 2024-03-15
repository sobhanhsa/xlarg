"use client"

import { useState } from "react";
import styles from "./profilePage.module.css"
import { PostType } from "@/types/postType";
import useSWR, { mutate } from "swr";
import Image from "next/image";

import { MdDelete } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { toast } from "react-toastify";

const fetcher = async(url:string) => {

    const res = await fetch(url);

    const data = await res.json();

    if (!res.ok) {
        const error = new Error(data.message);
        
        throw error;

    }

    return data.posts;

}


const ProfilePage = () => {
    
    const {data:posts,isLoading,mutate} = useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/users/posts`
    ,fetcher);
        
    const deletePost = async(slug:string) => {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "posts/" + slug , {
            method:"delete"
        })
        console.log(await res.json())
        if (res.ok) {
            toast.success("your post successfully deleted")
            mutate()
            return 
        };
        toast.error("some thing went wrong")
    };  

    return (
        <div className={styles.container}>
            {posts?.map((p:PostType) => {
                return (
                    <div key={p.id} className={styles.post}>
                        
                        <div className={styles.textContainer}>
                            <div className={styles.subTextContainer}>
                                <span className={styles.category}>
                                    {p.catSlug}
                                </span>
                                <span className={styles.date}>
                                    {p.createdAt.substring(0,10)}
                                </span>
                            </div>
                            <p className={styles.title}>{p.title}</p>
                        </div>
                        {p.img && (<div className={styles.imageContainer}>
                            <Image 
                                className={styles.image}
                                src={p.img}
                                alt="post image"
                                fill 
                            />
                        </div>)}
                        <div className={styles.buttons}>
                            <span 
                                className={`${styles.iconContainer} ${styles.delete}`}
                                onClick={() => {
                                    deletePost(p.slug);
                                }}    
                            >
                                <MdDelete color="red" size={25}/>
                            </span>
                            <span className={`${styles.iconContainer} ${styles.edit}`}>
                                <MdOutlineModeEditOutline size={25}/>
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
};

export default ProfilePage;