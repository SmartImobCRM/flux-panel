import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body as { [key:string]:any };
    try {
        const id = body.id as string;
        const Migracao = await prisma.migracao.update({
            where: {
                id,
            },
            data: {
                ...(body.createPayload as { [key:string]:any }),
                id,
            } as Prisma.MigracaoUpdateInput,
        })
        res.json({idMigracao:Migracao.id})
    } catch (error) {
        res.send(error)
    }
}
export default handler;