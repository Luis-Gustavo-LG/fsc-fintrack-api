import { faker } from "@faker-js/faker";
import { DeleteUserController } from "./delete-user.js";
import { jest } from "@jest/globals";

describe("Delete User Controller", () => {
    class DeleteUserUseCaseStub {
        execute(userId) {
            return {
                id: faker.string.uuid(),
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 6
                }),
            }
        }
    }
    const makeSut = () => {
        const deleteUserUseCaseStub = new DeleteUserUseCaseStub();
        const deleteUserController = new DeleteUserController(deleteUserUseCaseStub);
        return {
            deleteUserUseCaseStub,
            deleteUserController
        }
    }

    const makeResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    const httpRequest = {
        params: {
            id: faker.string.uuid(),
        }
    };

    it("Should return 200 if user is deleted", async () => {
        const { deleteUserController } = makeSut();

        const httpResponse = makeResponse();

        //act
        await deleteUserController.execute(httpRequest, httpResponse);

        //assert
        expect(httpResponse.status).toHaveBeenCalledWith(200);
    })
})