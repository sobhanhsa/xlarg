import Image from "next/image";
import styles from "./footer.module.css"
import Link from "next/link";

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div className={styles.logo}>
                    <Image className={styles.image} src="/logo.png" width={50} height={50} alt="pille logo" />
                    <h1 className={styles.logoTitle}>PILLE Blog</h1>
                </div>
                <p className={styles.desc}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Nam inventore consequuntur voluptates atque unde deserunt voluptatem officia explicabo.
                    Culpa asperiores veritatis esse commodi perferendis? Mollitia nam maiores odit placeat vel!
                </p>
                <div className={styles.icons}>
                    <Image className={styles.icon} width={20} height={20} src="/youtube.png" alt="youtube icon"/>
                    <Image className={styles.icon} width={20} height={20} src="/tiktok.png" alt="tiktok icon"/>
                    <Image className={styles.icon} width={20} height={20} src="/instagram.png" alt="instagram icon"/>
                    <Image className={styles.icon} width={20} height={20} src="/facebook.png" alt="facebook icon"/>
                </div>
            </div>
            <div className={styles.links}>
                <div className={styles.list}>
                    <span className={styles.listTitle}>Links</span>
                    <Link href="/">Homepage</Link>
                    <Link href="/blog">blog</Link>
                    <Link href="/">About</Link>
                    <Link href="/">Contact</Link>
                </div>
                <div className={styles.list}>
                    <span className={styles.listTitle}>Tags</span>
                    <Link href="/">Style</Link>
                    <Link href="/blog">Fashion</Link>
                    <Link href="/">Coding</Link>
                    <Link href="/" className={styles.etc}>...</Link>
                </div>
                <div className={styles.list}>
                    <span className={styles.listTitle}>Social</span>
                    <Link href="/">Instagram</Link>
                    <Link href="/">TikTok</Link>
                    <Link href="/">Youtube</Link>
                    <Link href="/">Facebook</Link>
                </div>
            </div>


        </div>
    );
}
 
export default Footer;