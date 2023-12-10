require("dotenv").config();
import config from "config";
import cors from "cors";
import express from "express";
import fs from "fs";
import helmet from "helmet";
import morgan from "morgan";
import nodemailer from "nodemailer";
import accountLogged from "./middleware/accountLogged";
import genAdminAccount from "./middleware/genAdminAccount";
import router from "./routes";
import connectToDb from "./utils/connectToDb";
import log from "./utils/logger";

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());

app.options("*", cors);

// morgan
morgan.token("id", function (req) {
  return req.headers["content-type"];
});

const accessLogStream = fs.createWriteStream("access.log", {
  flags: "a",
});

app.use(
  morgan("- [:date[web]] :method :url :status :referrer :user-agent :id", {
    stream: accessLogStream,
    immediate: true,
    skip: function (req, res) {
      return res.statusCode === 404;
    },
  })
);

app.use(genAdminAccount);

app.use(accountLogged);

app.use(router);

const port = config.get("port");

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vixmatma@gmail.com",
    pass: "macxhqqbpcfoxepm",
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready Transporter");
  }
});

app.listen(port, () => {
  log.info(`App started at http://localhost:${port}`);
  connectToDb();
});
