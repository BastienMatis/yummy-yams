import express from 'express';
import { createUser, getOneUser, getAllWinners } from "./user.controller";
const router = express.Router();
router.post('/signup', createUser);
router.post('/signin', getOneUser);
router.get('/winners', getAllWinners);
export default router;
