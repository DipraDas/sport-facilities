import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { FacilityRoutes } from "../modules/Facility/facility.route";
import { BookingRoutes } from "../modules/Booking/booking.route";
import { CheckAvailabilityRoutes } from "../modules/CheckAvailability/checkAvailability.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/facility',
        route: FacilityRoutes
    },
    {
        path: '/bookings',
        route: BookingRoutes
    },
    {
        path: '/check-availability',
        route: CheckAvailabilityRoutes
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;