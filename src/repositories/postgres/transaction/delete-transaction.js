import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PostgresDeleteTransactionRepository {
    async execute(id) {
        const result = await prisma.transaction.delete({
            where: {
                id: id
            }
        })

        return result;
    }
}