import {User} from "../user/user.model";
import {Cow} from "../cow/cow.model";
import ApiError from "../../../erros/ApiError";
import mongoose from "mongoose";
import {Order} from "./order.model";

const buyCow = async (cowId: string, buyerId: string) => {
  const session = await mongoose.startSession();
  let updatedBuyer;
  let updatedCow;
  let updatedSeller;

  try {
    session.startTransaction();
    const buyer = await User.findById(buyerId).session(session);
    let cow = await Cow.findById(cowId).session(session);

    let sellerId : string | undefined = cow?.seller?.toString();
    if(!sellerId || !buyer?.budget || !cow?.price || !cow?.label) {
      throw new ApiError(500, 'Internal error');
    }
    sellerId = sellerId.replace("ObjectId(", "").replace(")", "");
    let seller = await User.findById(sellerId).session(session);
    if (seller?.income === undefined || cow?.price === undefined || cow?.label === undefined || buyer?.budget === undefined) {
      throw new ApiError(500, 'Internal error');
    }

    if (seller?.income < 0 || cow?.price < 0 ||  buyer?.budget < 0) {
      throw new ApiError(500, 'Income, price or budget cannot be negative');
    }

    if(buyer?.budget < cow?.price) {
      throw new ApiError(500, 'Buyer do not have enough money');
    }

    buyer.budget -= cow.price;
    updatedBuyer = await buyer.save({session});
    seller.income += cow.price;
    updatedSeller = await seller.save({session});
    cow.label = 'sold out';
    updatedCow = await cow.save({session});

    await Order.create({ cowId, buyerId, sellerId });

    await session.commitTransaction();
    await session.endSession();

    return {
      cow: updatedCow,
      buyer: updatedBuyer,
      seller: updatedSeller
    }

  } catch (error) {
    await session.commitTransaction();
    await session.endSession();
    throw error;
  }
}

const getAllOrders = async ()=> {
  const orders = await Order.find({});

  return orders;
}

export const OrderService = {
  buyCow,
  getAllOrders
}