import { z } from "zod";
import { createTRPCRouter, adminProcedure, privateProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import uid from 'tiny-uid';
import { faker } from '@faker-js/faker';

export const actionRouter = createTRPCRouter({
    getActionsFromMigracao: adminProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
        
        const actions = await ctx.prisma.action.findMany({
            where: {
                migracaoId: input.id,
            }
        });
        return { actions };
    }),
    getActionsMain: adminProcedure
    .query(async ({ ctx, input }) => {
        const items = await ctx.prisma.action.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: 10,
        });
        return items;
    }),
});
