import * as mongodb from "mongodb";

export interface IPlant {
    _id?: mongodb.ObjectId;
    name: string;
    wateringNeeds: "low" | "medium" | "high"
}