import stripe from "stripe";
import Order from "../models/order.model.js";

const stripePaymnt = new stripe("sk_test_OIe8mv72lxUoLroP1KD1h80u");

const YOUR_DOMAIN = "http://localhost:3000";

let items = [];

export const getEveryOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("userId", "firstname");

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// get all orders  by user

export const getOrdersByUser = async (req, res) => {
  const { _id } = req.user;
  let id = _id.toString();

  try {
    const orders = await Order.find({ userId: id });
    if (orders) res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// get single order
export const getOrderDetail = async (req, res) => {
  const { _id } = req.user;
  const { orderId } = req.params;
  const currentUser = _id.toString();

  try {
    const details = await Order.findById({ _id: orderId });

    res.status(200).json({ details });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createNewOrder = async (req, res) => {
  const { _id } = req.user;
  const { paymentDetails } = req.body;

  if (_id) {
    if (paymentDetails.status === "COMPLETED") {
      try {
        const order = new Order({
          products: req.body.cartItems,
          shippingDetails: req.body.shippingAddress,
          shippingCharge: req.body.shippingCharge,
          shippingType: req.body.shippingType,
          total: req.body.total,
          paymentMode: req.body.paymentMode,
          paymentDetails: req.body.paymentDetails,
          isPaid: true,
          userId: _id,
        });
        const newOrder = await order.save();
        res.status(201).json({ newOrder: newOrder, msg: "Order created" });
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
    }
  }
};

export const updateOrderDeliveryStatus = async (req, res) => {
  const { id } = req.params;
  const { isDelivered } = req.body;

  if (id) {
    try {
      const order = await Order.findById({ _id: id });
      if (order && !order.isDelivered) {
        if (isDelivered) {
          order.isDelivered = true;

          const updated = await order.save();
          res.status(201).json({ updated, msg: "Updated Successfully" });
        }
      }
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
};

// // create pyament
// export const createPayment = async (req, res) => {
//   const { cartItems, userId } = req.body;

//   items = [...cartItems];

//   const line_items = cartItems.map((item) => {
//     return {
//       price_data: {
//         currency: "aud",
//         product_data: {
//           name: item.name,
//           images: [item.thumbnail?.img_url],
//           desc: item.desc,
//           metadata: {
//             id: item.id,
//           },
//         },
//         unit_amount: item.price,
//       },
//       quantity: item.qty,
//     };
//   });

//   try {
//     // creating customer
//     const customer = await stripePaymnt.customers.create({
//       metadata: {
//         userId: userId,
//         // cartItems: JSON.stringify(cartItems),
//       },
//     });

//     // creating session
//     const session = await stripePaymnt.checkout.sessions.create({
//       payment_method_types: ["card"],
//       shipping_address_collection: {
//         allowed_countries: ["AU", "NZ"],
//       },
//       shipping_options: [
//         {
//           shipping_rate_data: {
//             type: "fixed_amount",
//             fixed_amount: {
//               amount: 0,
//               currency: "aud",
//             },
//             display_name: "Free shipping",
//             // Delivers between 5-7 business days
//             delivery_estimate: {
//               minimum: {
//                 unit: "business_day",
//                 value: 5,
//               },
//               maximum: {
//                 unit: "business_day",
//                 value: 7,
//               },
//             },
//           },
//         },
//         {
//           shipping_rate_data: {
//             type: "fixed_amount",
//             fixed_amount: {
//               amount: 1500,
//               currency: "aud",
//             },
//             display_name: "Next day air",
//             // Delivers in exactly 1 business day
//             delivery_estimate: {
//               minimum: {
//                 unit: "business_day",
//                 value: 1,
//               },
//               maximum: {
//                 unit: "business_day",
//                 value: 1,
//               },
//             },
//           },
//         },
//       ],
//       phone_number_collection: {
//         enabled: true,
//       },
//       customer: customer.id,
//       line_items,
//       mode: "payment",
//       success_url: `http://localhost:3000/checkout-success`,
//       cancel_url: `http://localhost:3000/checkout`,
//     });
//     res.status(200).json({ cartItems: cartItems, url: session.url });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

// export const webhookController = async (req, res) => {
//   const event = req.body;

//   // Handle the event
//   switch (event.type) {
//     case "payment_intent.succeeded":
//       const paymentIntent = event.data.object;
//       console.log(paymentIntent);
//       stripePaymnt.customers
//         .retrieve(paymentIntent.customer)
//         .then((customer) => {
//           createOrder(customer, paymentIntent, items);
//         });
//       console.log("PaymentIntent was successful!");
//       break;
//     case "payment_method.attached":
//       const paymentMethod = event.data.object;
//       break;
//     // ... handle other event types
//     default:
//       return;
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   res.json({ received: true });
// };

// // order delete controller
export const removeOrder = async (req, res) => {
  const { orderId } = req.params;

  if (orderId) {
    try {
      const deleted = await Order.findByIdAndDelete({ _id: orderId });
      res.status(200).json({ deleted, msg: "Order removed" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
};

// // create order
// const createOrder = async (customer, data, items) => {
//   const newOrder = new Order({
//     userId: customer?.metadata?.userId,
//     customerId: data?.customer,
//     paymentIntentId: data?.payment_intent,
//     products: items,
//     total: data?.amount,
//     shipping: data?.shipping,
//     paymentStatus: data?.status,
//   });
//   try {
//     await newOrder.save();
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ msg: error.message });
//   }
// };

// // create order without stripe
// export const createNewOrder = async (req, res) => {
//   const userId = req.user?._id;
//   const items = req.body;

//   const newOrder = new Order({
//     userId: userId,
//     customerId: "data.customer",
//     paymentIntentId: "data.payment_intent",
//     products: items,
//     total: "10000",
//     shipping: "shipping",
//     paymentStatus: "success",
//   });

//   try {
//     await newOrder.save();
//     res.status(201).json({ msg: "Order Created" });
//   } catch (error) {
//     console.log(error.message);
//   }
// };
