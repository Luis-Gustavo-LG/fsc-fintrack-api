import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PostgresGetBalanceByUserIdRepository {
    async execute(userId){
        const result = prisma.$queryRaw`
            SELECT *
            FROM user_balance
            WHERE "userId" = ${userId}
        `

        return result;
    }
}