import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
dotenv.config({path: "./config/config.env"});
import cors from 'cors';
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/errorMiddleware.js";

import rootRoute from "./routes/rootRoute.js";
import ManagerRoute from './routes/ManagerRoute.js'
import StudentRoute from './routes/StudentRoute.js'

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/root", rootRoute);
app.use("/root/manager", ManagerRoute);
app.use("/root/student", StudentRoute);

dbConnection();

app.use(errorMiddleware);
export default app;