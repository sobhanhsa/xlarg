import Menu from "@/components/menu/Menu";
import styles from "./singlePage.module.css"
import Image from "next/image";
import Comments from "@/components/comments/Comments";
import { PostType } from "@/types/postType";

const getData = async (slug:string) => {
    const res = await fetch(`http://localhost:3000/api/posts/${slug}`,{
        cache:"no-store"
    })

    if (!res.ok) {
        throw new Error("fetching posts failed")
    }

    return res.json()
}

const SinglePage = async({params}:{params:{slug:string}}) => {

    const {post}:{post:PostType} = await getData(params.slug)

    return ( 
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.textContainer}>
                    <h1 className={styles.title}>{post.title}</h1>
                    <div className={styles.user}>
                        {
                        (post.user.image) &&
                            (
                            <div className={styles.userImageContainer}>
                                <Image className={styles.avatar} src={post.user.image} alt="" fill />
                            </div>
                            )
                        }
                        <div className={styles.userTextContainer}>
                            <span className={styles.username}>{post.user.name}</span>
                            <span className={styles.date}>
                                {post.createdAt.substring(0,10)}
                            </span>
                        </div>
                    </div>
                </div>
                {(post.img) && (
                    <div className={styles.imageContainer}>
                        <Image className={styles.image} src={post.img} alt="" fill />
                    </div>
                )}
            </div>
            <div className={styles.content}>
                <div className={styles.post}>
                    <div className={styles.description} 
                        dangerouslySetInnerHTML={{__html:post.desc}} 
                    />
                    <div className={styles.comment}>
                        <Comments postSlug={post.slug}/>
                    </div>
                </div>
                <Menu />
            </div>
        </div>
     );
}
 
export default SinglePage;