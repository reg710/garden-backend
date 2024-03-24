import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";
import { weatherRouter } from "./routes/weather.routes";
import { plantRouter } from "./routes/plant.routes";

dotenv.config();
const PORT = process.env.PORT || 5200;
const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
    console.error("Not ATLAS_URI has been defined in config");
    process.exit(1);
}

connectToDatabase(ATLAS_URI)
    .then(() => {
        const app = express();
        app.use(cors());

        // Registers the routes
        app.use("/weather", weatherRouter);
        app.use("/plant", plantRouter);

        app.listen(PORT, () => {
            console.log(`Server running at ${PORT}`);
        })
    })
    .catch((error) => console.error(error));