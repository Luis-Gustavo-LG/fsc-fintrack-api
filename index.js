import express from "express";
import dotenv from "dotenv";
import userRoutes from "./src/routes/user-routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use('/users', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
}); 