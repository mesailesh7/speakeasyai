import { PrismaClient } from "@prisma/client";


const prismaClientSingleton = () => {
    return new PrismaClient();
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

const prisma = globalForPrisma.prisma || prismaClientSingleton();

if (process.env.NODE_ENV === "production") globalForPrisma.prisma = prisma; // this is to prevent prisma from being recreated on every request in production


export default prisma;