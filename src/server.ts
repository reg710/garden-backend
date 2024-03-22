import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { weatherRouter } from "./weather.routes";

dotenv.config();
const PORT = process.env.PORT || 5200;

try {
    const app = express();
    app.use(cors());

    // Registers the weather routes
    app.use("/weather", weatherRouter);

    app.listen(PORT, () => {
        console.log(`Server running at ${PORT}`);
    });
} catch (error) {
    console.error(error);
}