import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PostgresCreateTransactionRepository {
    async execute(createTransactionParams) {
        const result = await prisma.transaction.create({
            data: {
                name: createTransactionParams.name,
                type: createTransactionParams.type,
                amountInCents: createTransactionParams.amountInCents,
                description: createTransactionParams.description,
                date: createTransactionParams.date,
                userId: createTransactionParams.userId,
            }
        })

        return result;
    }
}