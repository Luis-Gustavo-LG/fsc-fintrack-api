import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PostgresUpdateTransactionRepository {    
    async execute(transactionId, updatedTransactionParams) {

        const data = Object.fromEntries(
            Object.entries(updatedTransactionParams).filter(([_, value]) => value !== undefined)
        );

        const updatedTransaction = await prisma.transaction.update({
            where: {
                id: transactionId
            },
            data
        });

        return updatedTransaction;
    }
}