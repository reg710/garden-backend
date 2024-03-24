import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "../database";

export const plantRouter = express.Router();
plantRouter.use(express.json());

plantRouter.get("/", async (_req, res) => {
    try {
        const plants = await collections?.plants?.find({}).toArray();
        res.status(200).send(plants);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
});

plantRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const plant = await collections?.plants?.findOne(query);

        if (plant) {
            res.status(200).send(plant);
        } else {
            res.status(404).send(`Failed to find plant ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find plant ID ${req?.params?.id}`);
    }
});

plantRouter.post("/", async (req, res) => {
    try {
        const plant = req.body;
        const result = await collections?.plants?.insertOne(plant);

        if (result?.acknowledged) {
            res.status(201).send(`Created a new plant: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new plant.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error instanceof Error ? error.message : "Unknown error");
    }
});

plantRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const plant = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.plants?.updateOne(query, { $set: plant });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated plant ID ${id}.`);
        } else if (!result?.matchedCount) {
            res.status(404).send(`Failed to find plant ID ${id}`);
        } else {
            res.status(304).send(`Failed to update plant ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});

plantRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.plants?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed plant ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove plant ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find plant ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).send(message);
    }
});