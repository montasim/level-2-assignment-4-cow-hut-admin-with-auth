import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import {AdminValidation} from "./admin.validation";
import {AdminController} from "./admin.controller";

const router = express.Router();

router.post(
  '/create-admin',
  validateRequest(AdminValidation.createAdminZodSchema),
  AdminController.createAdmin
);

router.post(
  '/login',
  validateRequest(AdminValidation.loginAdminZodSchema),
  AdminController.loginAdmin
);

////TODO: will
// router.get(
//   '/my-profile',
//   validateRequest(UserValidation.createAdminZodSchema),
//   UserController.createAdmin
// );
//
// router.patch(
//     '/my-profile',
//     validateRequest(UserValidation.createAdminZodSchema),
//     UserController.createAdmin
// );


export const AdminRoutes = router;
