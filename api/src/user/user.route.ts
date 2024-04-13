// user.route.ts
import express from 'express';
import * as controller from "./user.controller";

const router = express.Router();

const routeDefinitions = {
    "/signup": {
        post: {
            actions: controller.createUser,
        },
    },
    "/signin": {
        get: {
            actions: controller.getOneUser,
        }
    },
    "/:userId": {
        delete: {
            actions: controller.deleteUser,
        },
    }
};

export default router;
