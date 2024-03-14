"use client"

import { useEffect, useState } from "react";
import styles from "./responsiveMenu.module.css"
import Link from "next/link";

const ResponsiveMenu = () => {

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => (
        () => {
            setIsOpen(false)
        }
    ),[])

    return ( 
        <div className={styles.container}>
            <div className={styles.burger} onClick={
                () => {
                    setIsOpen(!isOpen)
                }
            }>
                <div className={styles.line} ></div>
                <div className={styles.line} ></div>
                <div className={styles.line} ></div>
            </div> 
            {isOpen && (<div className={styles.responsiveMenu}>
                <Link className={styles.regularLinks} href={"/"}>Homepage</Link>
                <Link className={styles.regularLinks} href={"/contact"}>Contact</Link>
                <Link className={styles.regularLinks} href={"/about"}>About</Link>
            </div>)}
        </div>
    );
}
 
export default ResponsiveMenu;