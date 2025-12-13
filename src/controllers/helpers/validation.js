import validator from 'validator';
import { badRequest } from "./http.js";

export const checkIfIdIsValid = (id) => !validator.isUUID(id);

export const InvalidIdResponse = (response) => {
    return badRequest(response, { message: 'Invalid Id' })
}

export const validateRequiredFields = (params, requiredFields) => {
    for (const field of requiredFields) {
        const value = params[field];

        if (value === undefined || value === null) {
            return { ok: false, missingField: field };
        }

        if (typeof value === "string") {
            if (validator.isEmpty(value, { ignore_whitespace: true })) {
                return { ok: false, missingField: field };
            }
            continue;
        }

        if (typeof value === "number") {
            if (isNaN(value)) {
                return { ok: false, missingField: field };
            }
            continue;
        }

        return { ok: false, missingField: field };
    }

    return { ok: true, missingField: undefined };
};

export const validateAllowedFields = (params, allowedFields) => {
    const receivedFields = Object.keys(params);

    for (const field of receivedFields) {
        if (!allowedFields.includes(field)) {
            return {
                ok: false,
                invalidField: field
            };
        }
    }

    return { ok: true };
};

export const validateSomeFieldIsBlank = (params) => {
    const receivedFields = Object.keys(params);

    for (const field of receivedFields) {
        if (params[field] === undefined || params[field] === null) {
            return {
                ok: false,
                blankField: field
            };
        }
    }

    return { ok: true };
}
