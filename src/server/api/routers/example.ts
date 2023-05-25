import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import uid from 'tiny-uid';
import { faker } from '@faker-js/faker';

export const exampleRouter = createTRPCRouter({
  createUser: publicProcedure.query(async ({ ctx, input }) => {
    console.log(input)
    
  }),
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  hello2: publicProcedure
    .query(({ ctx }) => {
      return {
        greeting: `Hello`,
        uid: ctx.userId,
      };
    }),
  fullfill: publicProcedure.query(async () => {
    await prisma.dataSource.create({
      data: {
        id: '2',
        name: "ds_2",
        type: "mysql",
        createdAt: new Date(),
        description: '',
        url: 'http://localhost:3000/api/trpc/example.hello2',
      }
    })
  }),
  fullfill2: publicProcedure.query(async () => {
    await prisma.dataSource.create({
      data: {
        id: '3',
        name: "ds_3",
        type: "mysql",
        createdAt: new Date(),
        description: '',
        url: 'http://localhost:3000/api/trpc/example.hello2',
      }
    })
    await prisma.dataSourceLink.create({
      data: {
        dataSourceId: '3',
        dataSetId: '2',
      }
    })
    await prisma.dataSet.create({
      data: {
        id: '2',
        name: faker.lorem.words(3),
        createdAt: new Date(),
        description: faker.lorem.words(10),
      }
    })
    await prisma.dataSet.create({
      data: {
        id: '4',
        name: faker.lorem.words(3),
        createdAt: new Date(),
        description: faker.lorem.words(10),
      }
    })
    await prisma.migracao.createMany({
      data: [
        {
          id: uid(),
          dataSetId: '2',
          name: faker.lorem.words(3),
          createdAt: new Date(),
          status: 'pending', 
          progress: 0,
          paused: false,
          serverId: '1'
        },
        {
          id: uid(),
          dataSetId: '4',
          name: faker.lorem.words(3),
          createdAt: new Date(),
          status: 'online', 
          progress: 50,
          paused: false,
          serverId: '2'
        }
      ]
    })
  })
});
