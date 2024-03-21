import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

try {
    const app = express();
    app.use(cors());
    
    app.listen(5200, () => {
        console.log(`Server running at http://localhost:5200...`);
    });
} catch(error) {
    console.error(error);
}