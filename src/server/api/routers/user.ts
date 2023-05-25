import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import uid from 'tiny-uid';
import { faker } from '@faker-js/faker';

export const userRouter = createTRPCRouter({
    isAdmin: privateProcedure
    .query(async ({ ctx }) => {
        const userData = await prisma.user.findFirst({ where: { id: ctx.user?.id } })
        return userData?.isAdmin ?? false;
    }),
    getAll: privateProcedure.query(async ({ ctx }) => {
        const userData = await prisma.user.findMany();
        return userData;
    }),
});
