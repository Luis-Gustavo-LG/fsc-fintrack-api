import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PostgresDeleteUserRepository {
    async execute(userId) {
        const result = await prisma.user.delete({
            where: {
                id: userId
            }
        })

        return result;
    }
}