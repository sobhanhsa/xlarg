"use client"

import { signIn, useSession } from "next-auth/react";
import styles from "./loginPage.module.css"
import { useRouter } from "next/navigation";
import LoadingComponent from "@/components/loadingComponent/LoadingComponent";

const LoginPage = () => {

    const {status} = useSession()

    let router = null
    
    router = useRouter()
    

    if (status === "loading") return (<LoadingComponent />)


    if (status === "authenticated") {
        setTimeout(() => router!.push("/"),100)
    }
    
    return ( 
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div
                    className={styles.socialButton}
                    onClick={()=>signIn("google")}
                >Sign in with Google</div>
                <div className={styles.socialButton}>Sign in with Github</div>
                <div className={styles.socialButton}>Sign in with Facebook</div>
            </div>
        </div>
    );
}

export default LoginPage;