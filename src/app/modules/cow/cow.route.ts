import express from 'express';
import { CowController } from './cow.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CowValidation } from './cow.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(CowValidation.createCowZodValidation),
  CowController.createCow
);
router.get('/', CowController.getCows);
router.get('/:id', CowController.getCow);
router.patch(
  '/:id',
  // validateRequest(CowValidation.createCowZodValidation),
  CowController.updateCow
);
router.delete('/:id', CowController.deleteCow);

export const CowRoutes = router;
