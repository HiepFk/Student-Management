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

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Origin", "https://hiepfk-tlu.netlify.app");
//   res.header("Access-Control-Allow-Methods", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   next();
// });

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Origin", "https://hiepfk-tlu.netlify.app");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET",
//     "PUT",
//     "POST",
//     "DELETE",
//     "UPDATE",
//     "OPTIONS"
//   );
//   res.header("Access-Control-Allow-Headers", "*");
//   next();
// });
// app.options("/*", (_, res) => {
//   res.sendStatus(200);
// });
// app.use(cors());

// app.use(
//   cors({
//     allowedHeaders: "*",
//     allowMethods: "*",
//     origin: "https://hiepfk-tlu.netlify.app/",
//   })
// );
