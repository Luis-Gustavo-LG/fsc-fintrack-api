import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PostgresCreateUserRepository {
    async execute(createUserParams) {
        const result = await prisma.user.create({
            data: {
                firstName: createUserParams.firstName,
                lastName: createUserParams.lastName,
                email: createUserParams.email,
                password: createUserParams.password
            }
        })

        return result;
    }
}