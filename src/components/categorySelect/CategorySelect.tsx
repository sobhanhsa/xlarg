"use client"

import { categoryType } from "@/types/catType";
import styles from "./categorySelect.module.css"
import { useState } from "react";

const  CategorySelect = ({
    cats,
    cb
}:{
    cats:categoryType[],
    cb:(newCat:string)=>void
}) => {
    const [selected,setSelected] = useState<null | string>(null);
    return (
        <div className={styles.categoriesContainer}>
                {cats.map((cat) => {
                    return (
                        <span
                            key={cat.id} 
                            className={`${styles.category} ${cat.slug === selected && styles.active}`} 
                            onClick={() => {
                                setSelected(cat.slug);
                                cb(cat.slug);
                            }}
                        >
                            {cat.title}
                        </span>
                    )
                })}
        </div>
    )
};

export default CategorySelect;