import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))


app.use(express.json({
    limit: "16kb"
}))

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes import
import userRouter from "./routes/user.route.js"
import healthCheckRouter from "./routes/healthCheck.route.js"
import comment from "./routes/comment.route.js"
import dashboard from "./routes/dashboard.route.js"
import like from "./routes/like.route.js"
import playlist from "./routes/playlist.route.js"
import subscription from "./routes/subscription.route.js"
import tweet from "./routes/tweet.route.js"
import video from "./routes/video.route.js"
import googleLogin from "./routes/GoogleLogin.route.js"
import dislike from "./routes/dislike.route.js";

// Routes declaration
app.use("/api/v1/auth", googleLogin);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/comment", comment);
app.use("/api/v1/dashboard", dashboard);
app.use("/api/v1/like", like);
app.use("/api/v1/dislike", dislike);
app.use("/api/v1/playlist", playlist);
app.use("/api/v1/subscription", subscription);
app.use("/api/v1/tweet", tweet);
app.use("/api/v1/video", video);


export { app }