const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const httpStatusText = require("./utils/httpStatusText");
const port = process.env.PORT || 5004;

//1️⃣ Middlewares
app.use(express.json());
app.use(cors());

//2️⃣ Routes
const userRoute = require("./routes/userRoutes");
const authRoute = require("./routes/authRoutes");
// const bookRoute=require('./routes/bookRoutes');
// const borrowingRoute=require('./routes/borrowingRoute');
// const authorRoute=require('./routes/authorRoute');

app.use("/users", userRoute);
app.use("/auth", authRoute);
// app.use('/user',bookRoute)
// app.use('/user',borrowingRoute)
// app.use('/user',authorRoute)
app.use((req, res, next) => {
  res.status(404).json({
    status: httpStatusText.ERROR,
    message: "wrong URL",
  });
});

//3️⃣ Not Found handler
app.use((err, req, res, next) => {
  const statusCode=err.statusCode ||404;
  res.status(statusCode).json({ status: httpStatusText.ERROR, message: err.message });
});

//4️⃣ Database connection
mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("Hello from mongoDB");
  })
  .catch((err) => {
    console.log({ "error in mongoose connect": err });
  });

// 5️⃣ Start server
app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
