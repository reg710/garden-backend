import * as mongodb from "mongodb";
import { IPlant } from "./domain-objects/plant";

export const collections: {
    plants?: mongodb.Collection<IPlant>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("gardenProject");
    await applyPlantSchemaValidation(db);

    const plantsCollection = db.collection<IPlant>("plants");
    collections.plants = plantsCollection;
}

async function applyPlantSchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "wateringNeeds"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is a required string"
                },
                wateringNeeds: {
                    bsonType: "string",
                    description: "'wateringNeeds' is required and can either be 'low', 'medium, or 'high'",
                    enum: ["low", "medium", "high"]
                }
            }
        }
    };

    await db.command({
        collMod: "plants",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("plants", { validator: jsonSchema });
        }
    });
}