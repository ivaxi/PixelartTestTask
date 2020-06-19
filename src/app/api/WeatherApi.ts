import { Capital } from "../models/Capital";

const weatherApiKey = "5be59f209ce749ee681f889e0b56b804";

export const weatherApi = {
  getCapitals: (): Promise<Capital[]> => {
    return fetch(`http://localhost:8889/public/cityNames.json`).then((res) => res.json());
  },
  getWeather: (cityId: number): Promise<any> => {
	  return fetch(`http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${weatherApiKey}&units=imperial`)
      .then((res) => res.json());
  }

};

