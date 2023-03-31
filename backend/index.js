const connectionDb = require("./src/database/db");
const express = require("express");
const cors = require("cors");
const path = require("path");

const connection = connectionDb();
const app = express();

//Optimization
app.use(express.json());
// app.use(cors({
//    methods: ["http://localhost:3000"],
//    credentials: true,
//    allowedHeaders: ["http://localhost:3000"],
//    origin: ["http://localhost:3000"]
// }));
app.use(cors());

//Resim dosyalarını okuma için izin ver
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Routers
const authRouter = require("./src/routers/auth.router");
const postRouter = require("./src/routers/post.router");
const likePostRouter = require("./src/routers/like-post.router");
const commentRouter = require("./src/routers/comment.router");

//Connection
connection;

//Api Request
app.use("/api/auth", authRouter);
app.use("/api", postRouter);
app.use("/api", likePostRouter);
app.use("/api/comments", commentRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server ${port} üzerinde ayakta...`));