import { ReactNode } from "react";
import styles from "./card.module.css"
import Image from "next/image";
import Link from "next/link";
import { PostType } from "@/types/postType";

const Card = (
        {pkey,post}:{pkey:string,post:PostType}
    ) => {
    
    let desc = post.desc;
    
    if ( desc.startsWith("<p>")) {
        desc = desc.slice(3,73)
    }

    return ( 


        <div key={pkey} className={styles.container}>
                {(post.img) && (<div className={styles.imageContainer}>
                    <Image className={styles.image} src={post.img} alt="" fill />
                </div>)}
                <div className={styles.textContainer}>
                    <div className={styles.details}>
                        <span className={styles.date}>
                            {post.createdAt.substring(0,10)}-
                        </span>
                        <span className={styles.category}>{post.catSlug}</span>
                    </div>
                    <Link href={`/posts/${post.slug}`} className={styles.title}>
                        <h1>{post.title}</h1>
                    </Link>
                    <p className={styles.desc}>
                        {post.desc.substring(0,75).replace("<p>","").replace("</p>","")}
                    </p>
                    <Link href={`/posts/${post.slug}`} className={styles.link}>Read More</Link>
                </div>
        </div>
    );
}

export default Card;