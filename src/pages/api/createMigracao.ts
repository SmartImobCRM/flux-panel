import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body as { [key:string]:any };
    try {
        const Migracao = await prisma.migracao.create({
            data: {
                ...body.createPayload,
            } as Prisma.MigracaoCreateInput,
        })
        res.json({idMigracao:Migracao.id})
    } catch (error) {
        res.send(error)
    }
}
export default handler;