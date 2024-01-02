import loginRoute from "./User.login.js";
import logoutRoute from "./User.logout.js";
import registerRoute from "./User.register.js";
import isAuthorized from "../../../controllers/auth/Controller.isAuth.js";

export {
    loginRoute,
    logoutRoute,
    registerRoute,
    isAuthorized
}