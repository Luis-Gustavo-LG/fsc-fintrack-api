import { jest } from "@jest/globals";
import { CreateUserController } from "./create-user.js";
import { faker } from "@faker-js/faker";

class CreateUserUseCaseStub {
    execute(user) {
        return user
    }
}

const makeResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};


describe("Create User Controller", () => {
    it("should create a user", async () => {
        //arrange
        const createUserUseCaseStub = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(createUserUseCaseStub);

        const httpRequest = {
            body: {
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 6,
                }),
            }
        };

        const httpResponse = makeResponse();

        //act
        await createUserController.execute(httpRequest, httpResponse);

        //assert      
        expect(httpResponse.status).toHaveBeenCalledWith(201);
        expect(httpResponse.json).toHaveBeenCalledWith(httpRequest.body);
    })
})

describe("Create user without firstName", () => {
    it("should return a bad request error", async () => {
        //arrange
        const createUserUseCaseStub = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(createUserUseCaseStub);

        const httpRequest = {
            body: {
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 6,
                }),
            }
        };

        const httpResponse = makeResponse();

        //act
        await createUserController.execute(httpRequest, httpResponse);

        //assert      
        expect(httpResponse.status).toHaveBeenCalledWith(400);
        expect(httpResponse.json).toHaveBeenCalledWith({ message: "First name is required" });
    })
})

describe("Create user without lastName", () => {
    it("should return a bad request error", async () => {
        //arrange
        const createUserUseCaseStub = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(createUserUseCaseStub);

        const httpRequest = {
            body: {
                firstName: faker.person.firstName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 6,
                }),
            }
        };

        const httpResponse = makeResponse();

        //act
        await createUserController.execute(httpRequest, httpResponse);

        //assert      
        expect(httpResponse.status).toHaveBeenCalledWith(400);
        expect(httpResponse.json).toHaveBeenCalledWith({ message: "Last name is required" });
    })
})

describe("Create user without email", () => {
    it("should return a bad request error", async () => {
        //arrange
        const createUserUseCaseStub = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(createUserUseCaseStub);

        const httpRequest = {
            body: {
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                password: faker.internet.password({
                    length: 6,
                }),
            }
        };

        const httpResponse = makeResponse();

        //act
        await createUserController.execute(httpRequest, httpResponse);

        //assert      
        expect(httpResponse.status).toHaveBeenCalledWith(400);
        expect(httpResponse.json).toHaveBeenCalledWith({ message: "Invalid email" });
    })
})

describe("Create user with invalid email", () => {
    it("should return a bad request error", async () => {
        //arrange
        const createUserUseCaseStub = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(createUserUseCaseStub);

        const httpRequest = {
            body: {
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: "john.example.com",
                password: faker.internet.password({
                    length: 6,
                }),
            }
        };

        const httpResponse = makeResponse();

        //act
        await createUserController.execute(httpRequest, httpResponse);

        //assert      
        expect(httpResponse.status).toHaveBeenCalledWith(400);
        expect(httpResponse.json).toHaveBeenCalledWith({ message: "Invalid email" });
    })
})

describe("Create user without password", () => {
    it("should return a bad request error", async () => {
        //arrange
        const createUserUseCaseStub = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(createUserUseCaseStub);

        const httpRequest = {
            body: {
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
            }
        };

        const httpResponse = makeResponse();

        //act
        await createUserController.execute(httpRequest, httpResponse);

        //assert      
        expect(httpResponse.status).toHaveBeenCalledWith(400);
        expect(httpResponse.json).toHaveBeenCalledWith({ message: "Password is required" });
    })
})

describe("Create user with less than 6 characters password", () => {
    it("should return a bad request error", async () => {
        //arrange
        const createUserUseCaseStub = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(createUserUseCaseStub);

        const httpRequest = {
            body: {
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 5,
                }),
            }
        };

        const httpResponse = makeResponse();

        //act
        await createUserController.execute(httpRequest, httpResponse);

        //assert      
        expect(httpResponse.status).toHaveBeenCalledWith(400);
        expect(httpResponse.json).toHaveBeenCalledWith({ message: "Password must have at least 6 characters" });
    })
})

describe("Create user with blank firstName", () => {
    it("should return a bad request error", async () => {
        //arrange
        const createUserUseCaseStub = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(createUserUseCaseStub);

        const httpRequest = {
            body: {
                firstName: "       ",
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 6,
                }),
            }
        };

        const httpResponse = makeResponse();

        //act
        await createUserController.execute(httpRequest, httpResponse);

        //assert      
        expect(httpResponse.status).toHaveBeenCalledWith(400);
        expect(httpResponse.json).toHaveBeenCalledWith({ message: "First name must have at least 2 characters" });
    })
})

describe("Create user with blank lastName", () => {
    it("should return a bad request error", async () => {
        //arrange
        const createUserUseCaseStub = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(createUserUseCaseStub);

        const httpRequest = {
            body: {
                firstName: faker.person.firstName(),
                lastName: "       ",
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 6,
                }),
            }
        };

        const httpResponse = makeResponse();

        //act
        await createUserController.execute(httpRequest, httpResponse);

        //assert      
        expect(httpResponse.status).toHaveBeenCalledWith(400);
        expect(httpResponse.json).toHaveBeenCalledWith({ message: "Last name must have at least 2 characters" });
    })
})

describe("Create user with a invalid field in request body", () => {
    it("should return a bad request error", async () => {
        //arrange
        const createUserUseCaseStub = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(createUserUseCaseStub);

        const httpRequest = {
            body: {
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 6,
                }),
                invalidField: "invalidField",
            }
        };

        const httpResponse = makeResponse();

        //act
        await createUserController.execute(httpRequest, httpResponse);

        //assert      
        expect(httpResponse.status).toHaveBeenCalledWith(400);
        expect(httpResponse.json).toHaveBeenCalledWith({ message: "Some provided fields are not allowed: invalidField" });
    })
})

describe("Verify if user is created with correct params", () => {
    it("should return a created response", async () => {
        //arrange
        const createUserUseCaseStub = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(createUserUseCaseStub);

        const httpRequest = {
            body: {
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({
                    length: 6,
                }),
            }
        };

        const httpResponse = makeResponse();

        const executeSpy = jest.spyOn(createUserController, "execute");

        //act
        await createUserController.execute(httpRequest, httpResponse);

        //assert      
        expect(executeSpy).toHaveBeenCalledWith(httpRequest, httpResponse);
    })
})
