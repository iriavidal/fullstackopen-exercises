import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then((response) => response.data);
};

const getWeather = (lat, lon) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  return axios.get(url).then((response) => response.data.current_weather);
};
/* I've preferred to use an API that does not ask for a key, to perform the exercise more quickly. */

export default { getAll, getWeather };
