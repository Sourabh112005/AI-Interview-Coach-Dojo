import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import connectDB from "./Database/database.js";
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cookieParser());
const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOption));

//routes
app.use("/api/v1/user", userRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
