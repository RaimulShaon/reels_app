import { NextAuthOptions } from "next-auth";
import { User } from "@/models/User";
import { connectToDatabase } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import  CredentialsProvider  from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {lebel: "Email", type: "email"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials:any): Promise<any> {
                if (credentials?.email || credentials?.password) {
                   throw new Error("Email and password are required")
                    
                }
                try {
                    await connectToDatabase();
                    const user = await User.findOne({email: credentials.email});
                    if (!user) {
                        throw new Error("No user found")
                    }
                    const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                    if (!isValidPassword) {
                        throw new Error("Invalid password")
                    }
                    return {id: user._id.toString(), 
                         email: user.email
                        }

                } catch (error) {
                    console.error("Error authorizing user", error)
                    return NextResponse.json({error: "Authorization failed"}, {status: 500})
                    
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({session, token}) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        }
    }, 

    pages: {
        signIn: "login",
        error: "/login"
    },

    session:{
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    secret: process.env.NEXTAUTH_SECRET

}