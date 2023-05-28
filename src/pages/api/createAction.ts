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