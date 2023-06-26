import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUser);
router.patch(
  '/:id',
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser
);
router.delete('/:id', UserController.deleteUser);

export const UserRoutes = router;
