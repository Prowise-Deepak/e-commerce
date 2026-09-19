import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function GET(){
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if(!session){
        return Response.json(
            {message: "Unauthorized"},
            {status: 401}
        )
    }

    return Response.json({
        user: session.user,
    })

}