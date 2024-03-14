import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect"
import { NextRequest, NextResponse } from "next/server"


export const GET = async(req:NextRequest) => {
    try {

        const {searchParams} = new URL(req.url)

        const postSlug : string = searchParams.get("postSlug") as string;

        const comments = await prisma.comment.findMany({
            where:{
                ...( postSlug && {postSlug} )
            },
            include:{
                user:true
            }
            
        })

        return new NextResponse(JSON.stringify(
                {
                    comments
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

export const POST = async(req:NextRequest) => {

    const session = await getAuthSession()

    if (!session) {
        return new NextResponse(JSON.stringify(
            {
            message:"not authenticated!"
            },{
            status:401
            } as any)
        )
    }

    try {

        const body = await req.json()

        const comment = await prisma.comment.create({
            data:{
                ...body,
                userEmail:(session as any).user.email
            } 
        })

        return new NextResponse(JSON.stringify(
                {
                    comment
                },{
                    status:201,
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