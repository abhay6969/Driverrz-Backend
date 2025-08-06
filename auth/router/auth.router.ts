import express from 'express';
import { refreshAccessToken, SignInDriver, SignInUser, SignUpDriver, SignUpUser } from '../controllers/auth.controller';


const router = express.Router();

router.post("/signUp",SignUpUser);
router.post("/signIn",SignInUser);
router.post("/refresh",refreshAccessToken);
router.post("/signUpDriver",SignUpDriver);
router.post("/signInDriver", SignInDriver);


export default router; 