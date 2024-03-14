"use client"

import useSWR from "swr"
import { useSession } from "next-auth/react"

import Link from "next/link";
import styles from "./commetns.module.css"
import Image from "next/image";
import { useState } from "react";

const fetcher = async(url:string) => {

    const res = await fetch(url);

    const data = await res.json();

    if (!res.ok) {
        const error = new Error(data.message);
        
        throw error;

    }

    return data;

}

const Comments = ({postSlug}:{postSlug:string}) => {

    const status = useSession()

    const {data,isLoading,mutate} = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/comments?postSlug=${postSlug}`
    ,fetcher)

    const [desc,setDesc] = useState("")

    const handleSubmit =async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`,{
            method:"POST",
            body:JSON.stringify({
                desc,
                postSlug
            })
        });

        mutate();
    }

    return ( 
        <div className={styles.container}>
            <h1 className={styles.title}>Comments</h1>
            { ( status.status as string ==="authenticated" ) 
            ? (
                <div className={styles.write}>
                    <textarea className={styles.input} placeholder="write a comment ..." 
                    onChange={(e) => setDesc(e.target.value)} />
                    <button className={styles.button} onClick={handleSubmit}>Send</button>
                </div>
            ):(
                <Link href="/login">Login to write a comment</Link>
            )}

            <div className={styles.comments}>
                {isLoading ? (<h5>loading...</h5>) : 
                    (
                        data.comments.map(
                            (comment:any) => (
                                <div className={styles.comment} key={comment.id}>
                                    <div className={styles.user}>
                                        {(comment.user.image) && (
                                            <Image className={styles.image} width={50} height={50} src={comment.user.image} alt=""/>
                                        )}
                                        <div className={styles.userInfo}>
                                            <span className={styles.username} >{comment.user.name}</span>
                                            <span className={styles.date} >
                                                {(comment.createdAt as string).substring(0,10)}
                                            </span>
                                        </div>
                                    </div>
                                    <p className={styles.desc}>
                                        {comment?.desc}
                                    </p>
                                </div>
                            )
                        )
                    )}
            </div>

        </div>
     );
}
 
export default Comments;