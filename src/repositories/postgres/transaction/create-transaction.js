import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PostgresCreateTransactionRepository {
    async execute(transaction) {
        const result = await prisma.transaction.create({
            data: transaction
        })

        return result;
    }
}