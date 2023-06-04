import type { NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import prisma from '../../../prisma/client'
export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === "POST") {
        const session = await unstable_getServerSession(req,res, authOptions)
        if(!session) return res.status(401).json({message: "please sign in to make a post"})
        const prismaUser = await prisma.user.findUnique({
            where: {email: session?.user?.email}
        })
        const title: string = req.body.title
        if(title.length > 300) return res.status(403).json({message: "please write a shorter post"})
        if(title.length == 0) {
            return res.status(403).json({message: "please do not leave empty"})

        }
        try {
            const result = await prisma.post.create({
                data: {
                    title,
                    userId: prismaUser.id,
                }
            })
            res.status(200).json(result);
        } catch(err) {
            res.status(403).json({err: "error has occured"})
        }

    }
}