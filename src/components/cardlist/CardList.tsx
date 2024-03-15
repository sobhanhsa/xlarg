import Image from "next/image";
import Pagination from "../pagination/Pagination";
import styles from "./cardlist.module.css"
import Card from "../card/Card";
import { pages } from "next/dist/build/templates/app-page";
import { PostType } from "@/types/postType";

//getPosts

const getData = async(page:number,cat:string) => {
    const res = await fetch(`http://localhost:3000/api/posts?page=${page}&cat=${cat}`,{
        cache:"no-store"
    })

    if (!res.ok) {
        throw new Error("fetching posts failed")
    }

    return res.json()

}



const CardList = async({page,cat}:{page:number,cat:string}) => {

    // if user want to annoy us!
    if (page < 0) {
        page *= -1;
    }

    const {posts , count} : {posts:PostType[],count:number} = await getData(page,cat)

    const POST_PER_PAGE = 2

    const hasPrev = page === 1 ? false : true

    const hasNext = page * POST_PER_PAGE < count

    return (
        <div className={styles.container}>
            {(count === 0) ? (
                <h1>no posts belongs to this category {":("}</h1>
            )
            :(
                <h1 className={styles.title}>Recent Posts</h1>
            )
            }
            <div className={styles.posts} >
                {posts.map(post => (
                    <Card key={post.id} post={post} pkey={post.id}/>
                ))}
                {/* <Card/>
                <Card/>
                <Card/>
                <Card/> */}
            </div>
            <Pagination page={page} hasNext={hasNext} hasPrev={hasPrev} />
        </div>
    );
}
 
export default CardList;