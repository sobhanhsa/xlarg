import Featured from "@/components/featured/Featured";
import styles from "./blogPage.module.css"
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardlist/CardList";
import Menu from "@/components/menu/Menu";

const BlogPage = (
    {searchParams}:{searchParams:{page?:string,cat?:string}}
) => {

    const page = parseInt(searchParams?.page as string) || 1;
    const cat : string = searchParams.cat || ""

    return ( 
        <div className={styles.container}>
            <h1 className={`${styles.title} ${styles[cat]}`}>{cat} category</h1>
            <div className={styles.content}>
                <CardList page={page} cat={cat || ""} />
                <Menu />
            </div>
        </div> 
    );
};

export default BlogPage;