import { ObjectId } from "mongodb";

export interface OrderProduct {
  productId: ObjectId | string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id?: ObjectId;

  userId: ObjectId | string;

  products: OrderProduct[];

  totalAmount: number;

  paymentId: string;

  razorpayOrderId: string;

  status: "Pending" | "Paid" | "Cancelled";

  paymentStatus: "Pending" | "Success" | "Failed";

  createdAt: Date;

  updatedAt: Date;
}