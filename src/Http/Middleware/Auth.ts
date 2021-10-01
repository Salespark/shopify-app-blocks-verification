import {errorResponse} from "../../utils/responses";
import statusCodes from "../../utils/status_codes";

const auth = (request: any, reply: any, done: any) => {
    let token = request.headers.authorization

    if (!token) {
        return errorResponse(reply, 'Invalid Token', statusCodes.BAD_REQUEST);
    }

    if (token !== process.env.SECRET_KEY) {
        return errorResponse(reply, 'Token is incorrect or expired.', statusCodes.UN_AUTHORIZED);
    }

    done()
};

export default auth;

