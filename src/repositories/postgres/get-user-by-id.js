import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PostgresGetUserByIdRepository {
    async execute(userId) {
        const result = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        return result;
    }
}