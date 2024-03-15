import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect"
import { NextRequest, NextResponse } from "next/server"

export const GET = async(req:NextRequest) => {

    const session = await getAuthSession();

    if (!session) {
        return new NextResponse(JSON.stringify(
            {
                message:"not authenticated!"
            },{
                status:401
            } as any)
        )
    };

    try {
        const user = await prisma.user.findUnique({
            where:{
                email:(session as any).user.email
            },
            include:{
                Post:true
            }
        });

        const posts = user?.Post;

        return new NextResponse(JSON.stringify(
            {
                posts
            },{
                status:200
            } as any)
        );

    } catch (e:any&Error) {
        return new NextResponse(JSON.stringify(
            {
                message:e.message
            },{
                status:500
            } as any)
        )
    }


}