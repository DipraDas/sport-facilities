import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { FacilityValidation } from './facility.validation';
import { FacilityController } from './facility.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post('/',
    auth(USER_ROLE.admin),
    validateRequest(FacilityValidation.facilityValidationSchema),
    FacilityController.createFacility
);

export const FacilityRoutes = router;