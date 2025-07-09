import express from 'express';
import { SignUpUser } from '../controllers/signUp.controller';

const router = express.Router();

router.post("/signUp",SignUpUser);

export default router;