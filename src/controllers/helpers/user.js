import validator from "validator";
import { badRequest } from "./http.js"

export const InvalidPasswordResponse = (response) => {
    return badRequest(response, { message: 'Password must be at least 6 characters long' })
}

export const InvalidEmailResponse = (response) => {
    return badRequest(response, { message: 'Invalid email' })
}

export const EmailIsAlreadyInUseResponse = (response) => {
    return badRequest(response, { message: 'Email already in use' })
}

export const InvalidUserIdResponse = (response) => {
    return badRequest(response, { message: 'Invalid Id' })
}

export const checkIfPasswordIsValid = (password) => password.length < 6;

export const checkIfEmailIsValid = (email) => !validator.isEmail(email);