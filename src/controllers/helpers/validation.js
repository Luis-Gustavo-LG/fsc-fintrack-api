import validator from 'validator';
import { badRequest } from "./http.js";

export const checkIfIdIsValid = (id) => !validator.isUUID(id);

export const InvalidIdResponse = (response) => {
    return badRequest(response, { message: 'Invalid Id' })
}