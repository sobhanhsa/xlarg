import prisma from "@/utils/connect"
import { NextResponse } from "next/server"

export const GET = async(req:any) => {
    try {
        const categories = await prisma.category.findMany();
        return new NextResponse(JSON.stringify(
                {
                    categories,
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