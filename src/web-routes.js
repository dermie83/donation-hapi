import { accountsController } from "./controllers/accounts-controller.js";
import { lightouseController } from "./controllers/lighthouse-controller.js";
export const webRoutes = [
    { method: "GET", path: "/", config: accountsController.index },
    { method: "GET", path: "/signup", config: accountsController.showSignup },
    { method: "GET", path: "/login", config: accountsController.showLogin },
    { method: "GET", path: "/logout", config: accountsController.logout },
    { method: "POST", path: "/register", config: accountsController.signup },
    { method: "POST", path: "/authenticate", config: accountsController.login },
    { method: "GET", path: "/lighthouse", config: lightouseController.index },
    { method: "POST", path: "/lighthouse", config: lightouseController.add },
    { method: "GET", path: "/report", config: lightouseController.report },
    // { method: "POST" as const, path: "/lighthouse/uploadimage", config: lightouseController.uploadImage },
    {
        method: "GET",
        path: "/{param*}",
        handler: {
            directory: {
                path: "./public",
            },
        },
        options: { auth: false },
    },
];
