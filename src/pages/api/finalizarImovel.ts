import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { prisma } from "~/server/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await NextCors(req, res, {
     methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
     origin: '*',
     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  const body = JSON.parse(req.body as string) as { [key:string]:any };
    if (!req.body) return res.status(400).json({ok:false,error:'no body'})
    try {
        const id = body.id as string;
        const Migracao = await prisma.migracao.update({
            where: {
                id,
            },
            data: {
                doneImoveis: {
                    increment: 1
                }
            },
        })
        res.json({idMigracao:Migracao.id, doneImoveis:Migracao.doneImoveis})
    } catch (error) {
        res.status(400).json({ok:false, error})
    }
}
export default handler;