import CustomAPIError from "./custom-api";
import UnauthenticatedError from "./unauthenticated"
import NotFoundError from "./not-found";
import BadRequestError from "./bad-request";

export default() =>{
    return {
        CustomAPIError,
        UnauthenticatedError,
        NotFoundError,
        BadRequestError
    }
}