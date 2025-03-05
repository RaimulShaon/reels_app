import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/User";
import { connectToDatabase } from "@/lib/db";

export async function POST(request: NextRequest) {
    
   try {
     const {email, password} = await request.json()
     if (!email || !password) {
         return NextResponse.json({error: "Email and password are required"}, {status: 400})
         
     }
     await connectToDatabase();
 
      const emailuser = await User.findOne({email})
         if (emailuser) {
             return NextResponse.json({error: "Email already exists"}, {status: 400})
         }
         const newUser = await User.create({email, password})
 
         return NextResponse.json({message:"User registered successfully"}, {status: 201})
   } catch (error) {
       console.error("Error registering user", error)
       return NextResponse.json({error: "User register failed "}, {status: 500})
    
   }
}