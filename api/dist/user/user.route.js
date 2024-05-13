import express from 'express';
import { createUser, getOneUser } from "./user.controller";
const router = express.Router();
router.post('/signup', createUser);
router.post('/signin', getOneUser);
export default router;
