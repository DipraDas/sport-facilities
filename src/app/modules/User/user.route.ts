import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../utils/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post('/create-admin',
    validateRequest(UserValidation.userValidationSchema),
    UserControllers.createAdmin
);

export const UserRoutes = router;