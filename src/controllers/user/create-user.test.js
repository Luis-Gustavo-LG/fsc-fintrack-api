import { CreateUserController } from "./create-user.js"

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
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
                password: "123456",
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
                lastName: "Doe",
                email: "john.doe@example.com",
                password: "123456",
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
                firstName: "John",
                email: "john.doe@example.com",
                password: "123456",
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
                firstName: "John",
                lastName: "Doe",
                password: "123456",
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
                firstName: "John",
                lastName: "Doe",
                email: "john.example.com",
                password: "123456",
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
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
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