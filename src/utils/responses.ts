import statusCodes from './status_codes';

export const errorResponse = (reply: any, message: string | null = null, code = statusCodes.VALIDATION_FAILED, data: [] | object | null = null) => {

    const responseObj = {status_code: code, message, data};

    reply.code(code).send(responseObj);

};


export const successResponse = (reply: any, message: string | null = null, data: [] | object | null = null, code = statusCodes.SUCCESS) => {

    const responseObj = {
        status_code: code,
        message,
        data
    };

    reply.code(code).send(responseObj);

};