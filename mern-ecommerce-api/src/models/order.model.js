import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    products: [
      {
        id: { type: String },
        name: { type: String },
        category: { type: String },
        price: { type: String },
        size: { type: String },
        color: { type: String },
        thumbnail: { type: String },
        qty: { type: Number },
      },
    ],
    // subTotal: { type: Number, required: true },
    total: { type: Number },
    shippingDetails: { type: Object },
    isDelivered: { type: Boolean, default: false },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paymentDetails: {
      type: Object,
    },
    paymentMode: { type: String },
    shippingCharge: { type: Number, default: 0 },
    shippingType: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
