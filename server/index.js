const { PORT, WEB_CACHE, MAX_JSON_SIZE, URL_ENCODE, REQUEST_TIME,
        REQUEST_NUMBER, } = require("./src/config/config.js");
const connectDB = require("./src/config/db.js");

// Basic Lib Import
const express = require("express");
const router = require("./src/route/api.js")
const app = express();
const path = require("path");

// Security Middleware Lib Import
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
//const mongoSanitize = require('express-mongo-sanitize')
const hpp = require("hpp");
const { xss } = require("express-xss-sanitizer");
const cookieParser = require("cookie-parser");

// Security Middleware Implement
app.use(cors());
app.use(cookieParser());
app.use(hpp());
app.use(helmet());
app.use(xss());
//app.use(mongoSanitize());
app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: URL_ENCODE }));

// Rate Limit
const limiter = rateLimit({
  windowMS: REQUEST_TIME,
  max: REQUEST_NUMBER,
});
app.use(limiter);

// Web Cahce
app.set("eTag", WEB_CACHE);

// mongoose Connection
connectDB();

// Route 
app.use('/eventmanagement/api', router)

app.use(express.static('client/dist'));

// Add React  Frontend Routing

app.use((req, res, next) => {
  const err = new Error(`Not Found: ${req.originalUrl}`);
  err.status = 404;
  next(err);
});

app.listen(PORT, () => {
  console.log(`Event Server is running on port ${PORT}`);
});
