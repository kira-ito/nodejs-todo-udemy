// const { application } = require("express");
const express = require("express");

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public/"))

const taskRoute = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();


// ルーティング設計
app.use("/api/v1/tasks", taskRoute);

const PORT = 5000;
app.listen(process.env.PORT || PORT, console.log("サーバが起動しました"));

// データベース接続
const start = async () => {
    try {
        await connectDB(process.env.MONGO_HEROKU_URL || process.env.MONGO_URL);
        app.get('/', (req, res) => res.send('<h2>TODO!</h2>'));
    } catch (err) {
        console.log(err);
    }
}


start();



