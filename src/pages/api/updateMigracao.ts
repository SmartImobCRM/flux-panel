import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body;
    try {
        const Migracao = await prisma.migracao.update({
            ...body.createPayload,
            id: body.id,
        })
        res.json({idMigracao:Migracao.id})
    } catch (error) {
        res.send(error)
    }
}
export default handler;