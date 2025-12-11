import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PostgresGetTransactionsByUserIdRepository {
    async execute(userId){
        const result = await prisma.transaction.findMany({
            where: {
                userId: userId
            }
        })

        return result;
    }
}