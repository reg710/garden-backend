import * as express from "express";
import * as dotenv from "dotenv";
import axios from "axios";
import { DateTime } from 'luxon';
import { WeatherReport, IWeatherParams } from "./domain-objects/historical-weather";

dotenv.config();
const { WEATHER_API_KEY } = process.env;
const { WEATHER_API_URL } = process.env;
const { WEATHER_API_HOST } = process.env;

export const weatherRouter = express.Router();
// TODO lookup more info
weatherRouter.use(express.json());

weatherRouter.get("/:zip", async (req, res) => {
    const zip = req?.params?.zip;
    if (!zip) {
        // TODO handle error
    }

    const params = createWeatherParams(zip);
    const options = {
        method: 'GET',
        url: WEATHER_API_URL,
        params,
        headers: {
            'X-RapidAPI-Key': WEATHER_API_KEY,
            'X-RapidAPI-Host': WEATHER_API_HOST,
        }
    };
    try {
        const weatherResponse = await axios.request(options);
        // TODO how to type axios response data?
        const precipationData = new WeatherReport(weatherResponse.data, zip)
        res.status(200).send(precipationData);
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error");
    }
})

// TODO move outside of routes file
function createWeatherParams(zip: string): IWeatherParams {
    // Searching from 1 week ago through end of yesterday
    let now = DateTime.now();
    let startDateTime = now.minus({ days: 7 }).startOf('day').toISO({ includeOffset: false });
    let endDateTime = now.minus({ days: 1 }).endOf('day').toISO({ includeOffset: false });
    let params: IWeatherParams = {
        startDateTime,
        location: zip,
        endDateTime,
        aggregateHours: '24',
        unitGroup: 'us',
        contentType: 'json',
        shortColumnNames: 'true'
    }
    return params;
}