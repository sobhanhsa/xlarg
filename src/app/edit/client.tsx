"use client"

import useSWR from "swr";
import UpdateEditor from "@/components/textEditor/UpdateEditor";
import { categoryType } from "@/types/catType";

const fetcher = async(url:string) => {

    const res = await fetch(url);

    const data = await res.json();

    if (!res.ok) {
        const error = new Error(data.message);
        
        throw error;

    }

    return data.posts;

}

const ClientEditPage = ({cats}:{cats:categoryType[]}) => {
    
    const {data:post,isLoading,mutate} = useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/users/posts`,fetcher);

    return (
        <UpdateEditor post={post} cats={cats} />   
    )
};

export default ClientEditPage;