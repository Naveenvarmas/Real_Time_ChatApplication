import dns from "node:dns/promises";
dns.setServers(["8.8.8.8", "1.1.1.1"]); // Use Google and Cloudflare DNS


import express from "express"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import { connectDB } from "./lib/db.js";

dotenv.config();
const app=express();

const port=process.env.PORT;

// // Increase the limit to 5MB (or more if needed)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json());
app.use(cookieParser());

console.log("CLOUD NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API KEY:", process.env.CLOUDINARY_API_KEY);
console.log("API SECRET:", process.env.CLOUDINARY_API_SECRET);

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
}))

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

app.listen(port,()=>{
  console.log("server is running  on port :"+port);
  connectDB();
});