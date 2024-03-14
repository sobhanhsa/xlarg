import { UserType } from "@/types/userType"
import { getAuthSession } from "@/utils/auth"
import prisma from "@/utils/connect"
import { where } from "firebase/firestore"
import { NextRequest, NextResponse } from "next/server"

export const GET = async(req:NextRequest,{params}:any) => {
    try {

        // const user : UserType | undefined = await getAuthSession() as UserType | undefined

        
        const post = await prisma.post.findUnique({
            where:{
                slug:params.slug
            },
            include:{
                user:true
            }
            
        })
        
        // post && user && await prisma.user.update({
        //     where:{
        //         id:user.id
        //     },
        //     data:{
        //         visitedPosts:{ push:post?.id }
        //     }
        // });
        

        return new NextResponse(JSON.stringify(
                {
                    post
                },{
                    status:200,
                } as any
            )
        ) 
    }
    catch(error : any){
        console.error(error)
        return new NextResponse(
                JSON.stringify(
                    {
                        message:"something went wrong!", 
                        erorrMassage:error["message"],
                    },{
                        status:500,
                    } as any
                )
            );
    }

}