import axios from 'axios';

export const getWeather = (latitude, longitude) => {
     const url = `/forecast/${latitude},${longitude}`;
     return axios.get(url);
};
export const getWeatherByCity = (city, state) => {
    const url = `/forecast/location/${city},${state}`;
    return axios.get(url);
}

