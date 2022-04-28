import { useEffect, useState } from "react";
import secret from "./secrets.json";

export default function Weather() {
    const [weather, setWeather] = useState({});
    console.log("weather: ", weather);

    useEffect(() => {
        const lat = 52.516806;
        const lng = 13.383309;
        const params = "airTemperature,precipitation";
        fetch(
            `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`,
            {
                headers: {
                    Authorization: secret.WEATHER_TOKEN,
                },
            }
        )
            .then((response) => response.json())
            .then((jsonData) => {
                console.log("jsonData: ", jsonData);
                setWeather(jsonData);
            });
    }, []);

    return (
        <div className="weather flex">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 24 24"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#000000"
            >
                <g>
                    <path d="M0,0h24v24H0V0z" fill="none" />
                </g>
                <g>
                    <path d="M15,13V5c0-1.66-1.34-3-3-3S9,3.34,9,5v8c-1.21,0.91-2,2.37-2,4c0,2.76,2.24,5,5,5s5-2.24,5-5C17,15.37,16.21,13.91,15,13z M11,11V5c0-0.55,0.45-1,1-1s1,0.45,1,1v1h-1v1h1v1v1h-1v1h1v1H11z" />
                </g>
            </svg>
            <span>
                {weather.hours &&
                    Math.round(weather.hours[0].airTemperature.dwd)}{" "}
                ºC
            </span>
        </div>
    );
}
