import express from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import { CheckAvailabilityController } from './checkAvailability.controller';

const router = express.Router();

router.get('/',
    CheckAvailabilityController.getAllAvailableBooking
);

export const CheckAvailabilityRoutes = router;