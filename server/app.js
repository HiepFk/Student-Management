const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const app = express();

const AppError = require("./utils/appError");
const userRoute = require("./routes/userRoute");
const classRoute = require("./routes/classRoute");
const subjectRoute = require("./routes/subjectRoute");
const subjectEdRoute = require("./routes/subjectEdRoute");
const transcriptRoute = require("./routes/transcriptRoute");

const corsOptions = {
  origin: ["https://hiepfk-tlu.netlify.app", "http://localhost:8080"],
  credentials: true, //included credentials as true
};
app.use(cors(corsOptions));
// app.use(cors());
// app.options("*", cors());

app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Cho phép sử dụng cookie
app.use(cookieParser());

app.use(morgan("common"));

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour.",
});
app.use("/api", limiter);

app.use(express.json({ limit: "50mb" }));
// Phân tích data từ url
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// dọn data ở nosql câu lệnh truy vấn
app.use(mongoSanitize());

// dọn data chống lại các cuộc tấn công tệp lệnh trên nhiều trang web
// dọn các mã độc hại
app.use(xss());

// 3) ROUTES
// Các router api
app.use("/v1/user", userRoute);
app.use("/v1/class", classRoute);
app.use("/v1/subject", subjectRoute);
app.use("/v1/subjectEd", subjectEdRoute);
app.use("/v1/transcript", transcriptRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find this on this server!`, 404));
});

module.exports = app;
