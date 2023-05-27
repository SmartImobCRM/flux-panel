import { z } from "zod";
import { createTRPCRouter, adminProcedure, privateProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import uid from 'tiny-uid';
import { faker } from '@faker-js/faker';

export const migracaoRouter = createTRPCRouter({
    getMigracao: adminProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
        return await ctx.prisma.migracao.findUnique({
            where: {
                id: input.id
            },
        });
    }),
    recentMigracao: adminProcedure
    .input(z.object({ 
        limit: z.number(),
        cursor: z.string().nullish(),
        skip: z.number().optional(),
    }))
    .query(async ({ ctx, input }) => {
        const { limit, skip, cursor } = input;
        const items = await ctx.prisma.migracao.findMany({
            take: limit + 1,
            skip: skip,
            cursor: cursor ? { id: cursor } : undefined,
            orderBy: {
                createdAt: 'desc',
            },
        });
        let nextCursor: typeof cursor | undefined = undefined;
        if (items.length > limit) {
            const nextItem = items.pop(); // return the last item from the array
            nextCursor = nextItem?.id;
        }
        return {
            items,
            nextCursor,
        };
    }),
});
