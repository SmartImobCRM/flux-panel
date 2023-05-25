import { z } from "zod";
import { createTRPCRouter, isAdminProcedure, privateProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import uid from 'tiny-uid';
import { faker } from '@faker-js/faker';

export const userRouter = createTRPCRouter({
    recentMigracao: isAdminProcedure
    .input(z.object({ page: z.number() }))
    .query(async ({ ctx, input }) => {
        await prisma.migracao.findMany({
            skip: 1*input.page,
            take: 12,
        })
    }),
});
