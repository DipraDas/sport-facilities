import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { UserValidation } from '../User/user.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post('/signup',
    validateRequest(UserValidation.userValidationSchema),
    AuthController.createUser
);

export const AuthRoutes = router;