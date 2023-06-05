import prisma from "../../../prisma/client"
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import type { NextApiRequest, NextApiResponse } from "next"


export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(401).json({ message: "Please signin to create a post." })
  }
//   console.log(req.method)
//   console.log(req.body)
  if (req.method === "POST") {
    const postId = req.body.id
    try {
      const result = await prisma.post.delete({
        where: {
          id: postId,
        },
      })

      res.status(200).json(result)
    } catch (err) {
      res.status(403).json({ err: "Error has occured while deleting a post" })
    }
  }
}
