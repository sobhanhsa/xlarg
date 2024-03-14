"use client"

import Link from "next/link";
import styles from "./authLinks.module.css"
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const AuthLinks = () => {
    
    const {data,status} : {data:any,status: string} = useSession()

    return (
    <>
        {status === "unauthenticated" ? (

            <Link href={"/login"}>Login</Link>
        
        ) : (
            <>
                <Link href={"/write"}>Write</Link>
                <span className={styles.link} onClick={() => signOut()}>Logout</span>
            </>
        )}
    </>
    );
}
 
export default AuthLinks;