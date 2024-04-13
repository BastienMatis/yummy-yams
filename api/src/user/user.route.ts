import express from 'express';
import { createUser } from "./user.controller";

const router = express.Router();

router.post('/signup', createUser);

export default router;
