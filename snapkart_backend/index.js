import express from "express";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import testRoutes from "./routes/testRoute.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import Stripe from "stripe";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import session from 'express-session';
import MongoStore from 'connect-mongo';
//dot env config
dotenv.config();
// db connection
connectDB();
//stripe config
export const stripe = new Stripe(process.env.STRIPE_API_SECRET);
// cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
// rest object
const app = express();

//middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors("*"));
app.use(cookieParser());
app.use(mongoSanitize());
// app.use(session({
//   secret: process.env.SESSION_SECRET, // Replace with your own secret
//   resave: false,           // Don't save session if unmodified
//   saveUninitialized: false, // Save a session even if it's new and not modified
//   store: MongoStore.create({
//     mongoUrl: process.env.MONGO_URL,
//     collectionName: 'sessions'
//   }),
//   cookie: { secure: false, maxAge: 10 * 60 * 1000 } // Set to `true` if using HTTPS, or else `false`
// }));

// route
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cat", categoryRoutes);
app.use("/api/v1/order", orderRoutes);

app.get("/", (req, res) => {
  return res.status(200).send("<h1> Welcome</h1>");
});

//port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on ${process.env.PORT}`.bgMagenta.white);
});
