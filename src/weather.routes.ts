import * as express from "express";
import * as dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const { WEATHER_API_KEY } = process.env;

export const weatherRouter = express.Router();
// TODO lookup more info
weatherRouter.use(express.json());

weatherRouter.get("/", async (_req, res) => {
    const options = {
        method: 'GET',
        url: 'https://visual-crossing-weather.p.rapidapi.com/history',
        params: {
            startDateTime: '2022-08-27T00:00:00',
            aggregateHours: '24',
            location: '15201',
            endDateTime: '2022-08-28T00:00:00',
            unitGroup: 'us',
            contentType: 'json',
            shortColumnNames: '0'
        },
        headers: {
            'X-RapidAPI-Key': WEATHER_API_KEY,
            'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
        }
    };
    try {
        const weatherResponse = await axios.request(options);
        console.log(weatherResponse);
        res.status(200).send(weatherResponse.data);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
})