import { PrismaAdapter } from "@auth/prisma-adapter"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import prisma from "./connect"
import { AuthOptions, getServerSession } from "next-auth"

export const authOptions  = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.Google_ID as string,
            clientSecret: process.env.Google_SECRET as string,
            
        }),
    ],
}

export const getAuthSession = () => getServerSession(authOptions as any)