import NextAuth from "next-auth"

import { authOptions } from "@/utils/auth"
import { PrismaAdapter } from "@auth/prisma-adapter";

const handler = NextAuth(
    authOptions as any
);

export {handler as GET, handler as POST};