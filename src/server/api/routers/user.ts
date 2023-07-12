import { z } from "zod";
import { createTRPCRouter, privateProcedure, supabase, publicProcedure } from "../trpc";
import { prisma } from "~/server/db";
import uid from 'tiny-uid';
import { faker } from '@faker-js/faker';

export const userRouter = createTRPCRouter({
    isAdmin: publicProcedure
    .query(async ({ ctx }) => {
        const userData = await prisma.user.findFirst({ where: { id: ctx.user?.id } })
        return userData?.isAdmin ?? false;
    }),
    getAll: privateProcedure.query(async ({ ctx }) => {
        const userData = await prisma.user.findMany();
        return userData;
    }),
    // __addAdmToUser: privateProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
    //     await prisma.user.update({
    //         where: {
    //             id: input.id,
    //         },
    //         data: {
    //             isAdmin: true,
    //         }
    //     })
    //     return true;
    // }),
    createUser: publicProcedure.input(z.object({ 
        email: z.string(), 
        password: z.string(),
        nome: z.string() 
    })).mutation(async ({ ctx, input }) => {
        if (!input.email || !input.password || !input.nome) {
            throw new Error('Preencha todos os campos')
        }
        const { data: createUserData, error: createUserError } = await supabase.auth.admin.createUser({
            email: input.email,
            email_confirm: true,
            password: input.password,
        })
        if (createUserError) {
            throw new Error('createUserError: '+createUserError.message)
        }
        if (createUserData.user) {
            try {
                await prisma.user.create({
                    data: {
                        id: createUserData.user.id,
                        email: input.email,
                        isAdmin: false,
                    }
                })
            } catch (error) {
                    throw new Error('upsertError: '+String(error))
            }
        }
        return { password: input.password, email: input.email }
    })
});
