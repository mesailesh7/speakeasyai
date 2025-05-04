import {auth} from "@clerk/nextjs/server"
import {NextResponse} from "next/server";
import {imagekit} from "imagekit"


const imagekit = new imagekit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
    privatekey: process.env.IMAGEKIT_PRIVATE_KEY || "",
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || ""
})

export async function GET() {
    await {userId} = await auth()
    if (!userId) {
        return NextResponse.json({error: "Unauthorized user"}, {
            status: 401
        })
    }
}