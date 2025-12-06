export const sendResponse = (res, status, body) => {
    return res.status(status).json(body);
};

export const badRequest  = (res, body) => sendResponse(res, 400, body);
export const created     = (res, body) => sendResponse(res, 201, body);
export const serverError = (res, body) => sendResponse(res, 500, body);
export const success     = (res, body) => sendResponse(res, 200, body);
