import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PostgresUpdateUserRepository {
    async execute(userId, updateUserParams) {

        const data = Object.fromEntries(
            Object.entries(updateUserParams).filter(([_, value]) => value !== undefined)
        );

        const result = await prisma.user.update({
            where: {
                id: userId
            },
            data
        })

        return result;
    }   
}
