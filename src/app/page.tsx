import React from "react";
import styles from "./homepage.module.css";
import Link from "next/link";
import Featured from "@/components/featured/Featured";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardlist/CardList";
import Menu from "@/components/menu/Menu";


export default function Home(
    {searchParams}:{searchParams:{page?:string}}
  ):React.ReactNode {

  const page = parseInt(searchParams?.page as string) || 1;


  return (
    <div className={styles.container}>
      <Featured />
      <CategoryList />
      <div className={styles.content}>
        <CardList page={page} cat="" />
        <Menu />
      </div>
    </div>
  );
}
