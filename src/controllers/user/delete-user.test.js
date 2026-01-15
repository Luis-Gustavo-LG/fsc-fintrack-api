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

    const makeRequest = (id = faker.string.uuid()) => ({
        params: { id }
    });

    it("Should return 200 if user is deleted", async () => {
        const { deleteUserController } = makeSut();

        const httpRequest = makeRequest();
        const httpResponse = makeResponse();

        //act
        await deleteUserController.execute(httpRequest, httpResponse);

        //assert
        expect(httpResponse.status).toHaveBeenCalledWith(200);
    })

    it("Should return 400 if id is invalid", async () => {
        const { deleteUserController } = makeSut();

        const httpRequest = makeRequest("invalid-id");
        const httpResponse = makeResponse();

        //act
        await deleteUserController.execute(httpRequest, httpResponse);

        //assert
        expect(httpResponse.status).toHaveBeenCalledWith(400);
    })

    it("Should return 404 if user is not found", async () => {
        const { deleteUserController, deleteUserUseCaseStub } = makeSut();

        const httpRequest = makeRequest();
        const httpResponse = makeResponse();

        deleteUserUseCaseStub.execute = jest.fn().mockRejectedValue({
            code: "P2025"
        });

        //act
        await deleteUserController.execute(httpRequest, httpResponse);

        //assert
        expect(httpResponse.status).toHaveBeenCalledWith(404);
    })

    it("Should return 500 if DeleteUserCase throws", async () => {
        const { deleteUserController, deleteUserUseCaseStub } = makeSut();

        const httpRequest = makeRequest();
        const httpResponse = makeResponse();

        deleteUserUseCaseStub.execute = jest.fn().mockRejectedValue(new Error());

        //act
        await deleteUserController.execute(httpRequest, httpResponse);

        //assert
        expect(httpResponse.status).toHaveBeenCalledWith(500);
    })
})