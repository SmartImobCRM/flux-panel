import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.body) return res.status(400).json({ok:false})

    const body = req.body as { [key:string]:any };
    try {
        await prisma.action.create({
            data: {
                ...(body.createPayload as { [key:string]:any }),
                createdAt: new Date(),
            } as Prisma.ActionCreateInput,
        })
        res.json({ok:true})
    } catch (error) {
        res.send(error)
    }
}
export default handler;