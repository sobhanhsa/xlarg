import Image from "next/image";
import styles from "./categoryList.module.css"
import Link from "next/link";
import { getCategories } from "@/utils/getCats";
import { categoryType } from "@/types/catType";


const CategoryList = async() => {

    const categories = (await getCategories())?.categories;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Popular Categories</h1>
            <div className={styles.categories}>

                {/* {typeof categories} */}

                {categories?.map((cat: categoryType) => (
                    <Link   href={`/blog?cat=${cat.slug}`}
                            className={`${styles.category} ${styles[cat.slug]}`}
                            key={cat._id}
                            >
                        <Image src={cat.img} alt="" width={32} height={32} className={styles.image} />
                        {cat.title} 
                    </Link>
                ))}
                
                {/* <Link href="/blog?cat=fashion" className={`${styles.category} ${styles.fashion}`} >
                    <Image src="/fashion.png" alt="" width={32} height={32} className={styles.image} />
                    fashion 
                </Link>
                
                <Link href="/blog?cat=food" className={`${styles.category} ${styles.food}`}>
                    <Image src="/food.png" alt="" width={32} height={32} className={styles.image} />
                    food 
                </Link>
                
                <Link href="/blog?cat=travel" className={`${styles.category} ${styles.travel}`}>
                    <Image src="/travel.png" alt="" width={32} height={32} className={styles.image} />
                    travel 
                </Link>
                
                <Link href="/blog?cat=culture" className={`${styles.category} ${styles.culture}`}>
                    <Image src="/culture.png" alt="" width={32} height={32} className={styles.image} />
                    culture 
                </Link>

                <Link href="/blog?cat=coding" className={`${styles.category} ${styles.coding}`}>
                    <Image src="/coding.png" alt="" width={32} height={32} className={styles.image} />
                    coding 
                </Link> */}
            </div>

        </div>
    );
}
 
export default CategoryList;