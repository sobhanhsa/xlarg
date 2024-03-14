"use client"

import { usePathname, useRouter } from "next/navigation";
import styles from "./pagination.module.css"

const Pagination = ({page,hasNext,hasPrev}:
    {page:number,hasNext:boolean,hasPrev:boolean}) => {
    const router = useRouter()

    const path = usePathname()

    console.log(page)


    return (
        <div className={styles.container}>
            <button className={styles.button} 
                onClick={() => router.push(`?page=${page-1}`)}
                disabled={!hasPrev}
                >
                Previous
            </button>
            <button className={styles.button}
                onClick={() => router.push(`?page=${page+1}`)}
                disabled={!hasNext}
            >
                Next
            </button>
        </div>
    );
}
 
export default Pagination;