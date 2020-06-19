export interface ICapitalWeather {
  base: string;
  clouds: IClouds;
  cod: number;
  coord: ICoord;
  dt: number;
  id: number;
  main: IMain;
  name: string;
  sys: ISys;
  visibility: number;
  weather: IWeather[];
  wind: IWind;
}

interface ISys {
  country: string;
  id: number;
  message: number;
  sunrise: number;
  sunset: number;
  type: number;
}

interface IClouds {
  all: number;
}

interface IWind {
  deg: number;
  speed: number;
}

interface IMain {
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

interface IWeather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface ICoord {
  lat: number;
  lon: number;
}