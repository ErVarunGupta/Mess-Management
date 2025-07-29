import express from 'express';
import { ManagerSignin, managerSignup } from '../controllers/ManagerController.js';
import { managerSigninValidation, managerSignupValidation } from '../middlewares/ManagerValidation.js';


const router = express.Router();

router.post("/manager-signup", managerSignupValidation, managerSignup);
router.post("/manager-signin", managerSigninValidation, ManagerSignin);

export default router;