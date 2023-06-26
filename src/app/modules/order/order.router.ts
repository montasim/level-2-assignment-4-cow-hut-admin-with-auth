import express from 'express';
import {OrderController} from "./order.controller";

const router = express.Router();

router.get('/', OrderController.getOrders);
router.post('/', OrderController.buyCow);

export const OrderRoutes = router;
