import dns from "node:dns/promises";
dns.setServers(["8.8.8.8", "1.1.1.1"]); // Use Google and Cloudflare DNS


import express from "express"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import { connectDB } from "./lib/db.js";
import {app,server} from "./lib/socket.js"
import path from "node:path";

dotenv.config();


const port=process.env.PORT;
const __dirname=path.resolve();

// // Increase the limit to 5MB (or more if needed)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json());
app.use(cookieParser());



app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
}))

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));

  app.get("/{*path}",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
  })
}

server.listen(port,()=>{
  console.log("server is running  on port :"+port);
  connectDB();
});