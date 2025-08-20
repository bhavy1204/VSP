import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({
    limit:"16kb"
}))

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());

// Routes import
import userRouter from "./routes/user.router.js"
import healthCheckRouter from "./routes/healthCheck.route.js"
import comment from "./routes/comment.router.js"

// Routes declaration
app.use("/api/v1/users",userRouter);
app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/comment", comment);


export {app}