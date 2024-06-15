import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { FacilityValidation } from './facility.validation';
import { FacilityController } from './facility.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.get('/',
    FacilityController.getAllFacility
);

router.post('/',
    auth(USER_ROLE.admin),
    validateRequest(FacilityValidation.facilityValidationSchema),
    FacilityController.createFacility
);

router.put('/:id',
    auth(USER_ROLE.admin),
    validateRequest(FacilityValidation.facilityUpdateValidationSchema),
    FacilityController.updateFacility
);

router.delete('/:id',
    auth(USER_ROLE.admin),
    FacilityController.deleteFacility
);

export const FacilityRoutes = router;