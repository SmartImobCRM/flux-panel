import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body;
    try {
        await prisma.action.create({
            ...body.createPayload,
            createdAt: new Date(),
        })
        res.json({ok:true})
    } catch (error) {
        res.send(error)
    }
}
export default handler;