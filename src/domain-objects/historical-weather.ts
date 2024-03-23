
export class HistoricalWeather {
    locationName: string;
    data: IWeatherData[];

    constructor(input: IWeatherResponse, searchZip: string) {
        this.locationName = input.locations[searchZip].name ? input.locations[searchZip].name : '';
        if (input.locations[searchZip].values) {
            this.data = input.locations[searchZip].values.map((dailyInfo: IWeatherValues) => {
                return {
                    datetimeStr: dailyInfo.datetimeStr,
                    precipitation: dailyInfo.precip
                }
            })
        } else {
            this.data = [];
        }
    }
}

export interface IWeatherData {
    datetimeStr: string;
    precipitation: number
}


// From Visual Crossing API response
export interface IWeatherResponse {
    columns: unknown,
    remainingCost: number,
    queryCost: number,
    messages: unknown,

    locations: any,
    // locations will be a response with the zip code as key
    // locations.values should be IWeatherValues[]

    // "locations": {
    //     "15201": {
    //       "stationContributions": null,
    //       "values": [
    //         {
    //           "wdir": 248.63,
    //           "temp": 72.3,
    //           "maxt": 80.5,
    //           "visibility": 9.3,
    //           "wspd": 6.4,
    //           "datetimeStr": "2022-08-27T00:00:00-04:00",
    //           "solarenergy": 18.4,
    //           "heatindex": 80.8,
    //           "cloudcover": 48.3,
    //           "mint": 66,
    //           "datetime": 1661558400000,
    //           "precip": 0,
    //           "solarradiation": 319,
    //           "weathertype": "Mist",
    //           "snowdepth": null,
    //           "sealevelpressure": 1018.1,
    //           "snow": null,
    //           "dew": 61.2,
    //           "humidity": 70.69,
    //           "precipcover": 0,
    //           "wgust": null,
    //           "conditions": "Partially cloudy",
    //           "windchill": null,
    //           "info": null
    //         },
    //       ],
    //       "id": "15201",
    //       "address": "15201, USA",
    //       "name": "15201, USA",
    //       "index": 0,
    //       "latitude": 40.471468,
    //       "longitude": -79.95726,
    //       "distance": 0,
    //       "time": 0,
    //       "tz": "America/New_York",
    //       "currentConditions": null,
    //       "alerts": null
    //     }
    //   }
}

export interface IWeatherValues {
    "wdir": number,
    "temp": number,
    "maxt": number,
    "visibility": number,
    "wspd": number,
    "datetimeStr": string // "2022-08-27T00:00:00-04:00" format,
    "solarenergy": number,
    "heatindex": number,
    "cloudcover": number,
    "mint": number,
    "datetime": number //1661558400000,
    "precip": number,
    "solarradiation": number,
    "weathertype": string,
    "snowdepth": number | null,
    "sealevelpressure": number,
    "snow": number | null,
    "dew": number,
    "humidity": number,
    "precipcover": number,
    "wgust": number | null,
    "conditions": string,
    "windchill": number | null,
    "info": any
}
