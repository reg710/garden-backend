import * as express from "express";

export const weatherRouter = express.Router();
// TODO lookup more info
weatherRouter.use(express.json());

weatherRouter.get("/", async (_req, res) => {
    try {
        res.status(200).send({ test: "passing" })
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
})