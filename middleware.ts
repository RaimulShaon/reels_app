import withAuth from "next-auth/middleware";
import  {NextResponse}  from "next/server";


export default withAuth(
    function middleware() {
        return NextResponse.next()
    
},
     {
        callbacks: {
            authorized: ({token, req}) =>{
                 const {pathname} =req.nextUrl

                if (pathname.startsWith("/api/auth") ||
                    pathname === "/login" ||
                    pathname === "/signup" 
                ) {
                   return true
                }   
            if (pathname.startsWith("api/videos")|| pathname === "/") {
                return true
            }
            return !!token
            }    
}
    }
)

export const config = {matcher: 
    ["/((?!_next/static|_next/image|favicon.ico|public/).*)"]
}