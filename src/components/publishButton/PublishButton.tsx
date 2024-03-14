"use client"
import styles from "./publishButton.module.css"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const PublishButton = () => {

    const path = usePathname()

    return path === "/write" &&
    (
        <button className={styles.publish}>
            publish
        </button>
    )
}

export default PublishButton

