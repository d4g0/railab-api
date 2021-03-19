import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import router from './router/router';
const app = express();
const { DOMAIN } = process.env;
import { jsonBodyLogger } from '~/utils';

console.log(DOMAIN);

var corsOptions = {
    origin: process.env.NODE_ENV == 'production' ? DOMAIN : '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));


// ---------------
// Debug 
// ---------------
process.env.NODE_ENV !== "production" && app.use(morgan("dev"));
process.env.NODE_ENV !== "production" && app.use(jsonBodyLogger);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Routes
app.use("/api", router);

app.use("*", (req, res) => res.status(404).json({ errorServer: `route -> ${req.originalUrl} ` + " not found" }));


export default app
