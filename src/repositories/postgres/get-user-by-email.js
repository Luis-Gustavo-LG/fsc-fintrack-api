import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PostgresGetUserByEmailRepository {
    async execute(email) {
        const result = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        return result;
    }
}