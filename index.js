import express from "express";
import dotenv from "dotenv";
import { UserRoutes, TransactionRoutes } from "./src/routes/index.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use('/users', new UserRoutes().getRouter());
app.use('/users', new TransactionRoutes().getRouter());

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});