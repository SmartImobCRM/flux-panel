import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import uid from 'tiny-uid';
import { faker } from '@faker-js/faker';
import tiny from 'tiny-uid';

export const exampleRouter = createTRPCRouter({
  hello2: publicProcedure.query(async () => {
  }),
});
