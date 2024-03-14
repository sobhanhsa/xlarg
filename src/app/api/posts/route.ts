import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect"
import { NextRequest, NextResponse } from "next/server"

export const GET = async(req:NextRequest) => {
    try {

        const {searchParams} = new URL(req.url)

        const page = parseInt(searchParams.get("page") as string);
        const cat = searchParams.get("cat");

        const POST_PER_PAGE = 2

        const query = {
            take:   POST_PER_PAGE,
            skip:   POST_PER_PAGE * (page - 1),
            where:{
                ...(cat && {catSlug:cat})
            }
        }

        const [posts,count] = await prisma.$transaction([
            prisma.post.findMany(query),
            prisma.post.count({where:query.where})
        ]);

        return new NextResponse(JSON.stringify(
                {
                    posts,
                    count
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

        const post = await prisma.post.create({
            data:{
                ...body,
                userEmail:(session as any).user.email
            } 
        })

        return new NextResponse(JSON.stringify(
                {
                    post
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