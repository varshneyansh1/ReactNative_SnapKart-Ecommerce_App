import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import { stripe } from "../index.js";

// CREATE ORDERS
export const createOrderController = async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentMethod,
      paymentInfo,
      itemPrice,
      tax,
      shippingCharges,
      totalAmount,
    } = req.body;
    //valdiation
    // create order
    await orderModel.create({
      user: req.user._id,
      shippingInfo,
      orderItems,
      paymentMethod,
      paymentInfo,
      itemPrice,
      tax,
      shippingCharges,
      totalAmount,
    });

    // stock update
    for (let i = 0; i < orderItems.length; i++) {
      // find product
      const product = await productModel.findById(orderItems[i].product);
      product.stock -= orderItems[i].quantity;
      await product.save();
    }
    res.status(201).send({
      success: true,
      message: "Order Placed Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Order API",
      error,
    });
  }
};

// GET ALL ORDERS - MY ORDERS
export const getMyOrdersController = async (req, res) => {
  try {
    // Ensure user ID is available
    if (!req.user || !req.user._id) {
      return res.status(400).send({
        success: false,
        message: "User ID not provided in the request.",
      });
    }

    // Find orders for the user
    const orders = await orderModel.find({ user: req.user._id });

    // If no orders found for the user
    if (orders.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No orders found for this user.",
      });
    }

    // If orders are found
    res.status(200).send({
      success: true,
      message: "Your orders data",
      totalOrder: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Error in My Orders API:", error.message || error);

    res.status(500).send({
      success: false,
      message: "Internal Server Error. Could not retrieve orders.",
      error: error.message || error,
    });
  }
};


// GET SINGLE ORDER INFO
export const singleOrderDetrailsController = async (req, res) => {
  try {
    // find orders
    const order = await orderModel.findById(req.params.id);
    //valdiation
    if (!order) {
      return res.status(404).send({
        success: false,
        message: "no order found",
      });
    }
    res.status(200).send({
      success: true,
      message: "your order fetched",
      order,
    });
  } catch (error) {
    console.log(error);
    // cast error ||  OBJECT ID
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error In Get UPDATE Products API",
      error,
    });
  }
};

// ACCEPT PAYMENTS
// Backend: Payments Controller
export const paymetsController = async (req, res) => {
  try {
    const { totalAmount } = req.body;

    // Validation
    if (!totalAmount) {
      return res.status(400).send({
        success: false,
        message: "Total Amount is required",
      });
    }

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100),  // Convert to smallest currency unit
      currency: "inr",
      payment_method_types: ["card"],
    });

    res.status(200).send({
      success: true,
      client_secret: paymentIntent.client_secret,  // Send back the client secret
    });
  } catch (error) {
    console.log('Error in Payment API:', error);
    res.status(500).send({
      success: false,
      message: "Error In Payment API",
      error,
    });
  }
};


// ========== ADMIN SECTION =============

// GET ALL ORDERS
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).send({
      success: true,
      message: "All Orders Data",
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get UPDATE Products API",
      error,
    });
  }
};

// CHANGE ORDER STATUS
export const changeOrderStatusController = async (req, res) => {
  try {
    // find order
    const order = await orderModel.findById(req.params.id);
    // validatiom
    if (!order) {
      return res.status(404).send({
        success: false,
        message: "order not found",
      });
    }
    if (order.orderStatus === "processing") order.orderStatus = "shipped";
    else if (order.orderStatus === "shipped") {
      order.orderStatus = "deliverd";
      order.deliverdAt = Date.now();
    } else {
      return res.status(500).send({
        success: false,
        message: "order already deliverd",
      });
    }
    await order.save();
    res.status(200).send({
      success: true,
      message: "order status updated",
    });
  } catch (error) {
    console.log(error);
    // cast error ||  OBJECT ID
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error In Get UPDATE Products API",
      error,
    });
  }
};