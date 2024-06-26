import express from 'express';
import validateRequest from '../../utils/validateRequest';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import { BookingValidation } from './booling.validation';
import { BookingController } from './booking.controller';

const router = express.Router();

router.get('/',
    auth(USER_ROLE.admin),
    BookingController.getBooking
);

router.get('/user',
    auth(USER_ROLE.user),
    BookingController.getSingleUsersBooking
);

router.post('/',
    auth(USER_ROLE.user),
    validateRequest(BookingValidation.bookingValidationSchema),
    BookingController.createBooking
);

router.delete(
    "/:id",
    auth(USER_ROLE.user),
    BookingController.deleteBookingForUser
);

export const BookingRoutes = router;