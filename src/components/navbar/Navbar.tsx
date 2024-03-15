import Image from "next/image";
import styles from "./navbar.module.css"
import Link from "next/link";
import AuthLinks from "../authLinks/AuthLinks";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { useContext } from "react";
import { ThemeContext, ThemeContextType } from "@/context/ThemeContext";
import ResponsiveMenu from "@/components/responsiveMenu/ResponsiveMenu";
import PublishButton from "@/components/publishButton/PublishButton";

const Navbar = () => {


    

    return (
        <div className={styles.container}>
            <div className={styles.social}>
                <Image src="/facebook.png" alt="facebook logo" width={24} height={24}/>
                <Image src="/instagram.png" alt="instagram logo" width={24} height={24}/>
                <Image src="/tiktok.png" alt="tiktok logo" width={24} height={24}/>
                <Image src="/youtube.png" alt="youtube logo" width={24} height={24}/>
            </div>
            <Link className={styles.logo} href="/">PilleBlog</Link>
            <div className={styles.links}>
                <ThemeToggle />
                <AuthLinks />
                {/* <PublishButton /> */}
                <div className={styles.responsiveMenu}>    
                    <ResponsiveMenu />
                </div>
                    
            </div>
        </div>
    );
}
 
export default Navbar;