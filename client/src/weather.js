import { useEffect, useState } from "react";
import secret from "./secrets.json";

export default function Weather() {
    const [weather, setWeather] = useState({});

    useEffect(() => {
        // const lat = 52.516806;
        // const lng = 13.383309;
        // const params = "airTemperature,precipitation";
        // fetch(
        //     `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`,
        //     {
        //         headers: {
        //             Authorization: secret.WEATHER_TOKEN,
        //         },
        //     }
        // )
        //     .then((response) => response.json())
        //     .then((jsonData) => {
        //         console.log("jsonData: ", jsonData);
        //         setWeather(jsonData);
        //     });
    }, []);

    return (
        <div className="weather">
            <h4>Today - Sunny and no chance of rain</h4>
            <p>
                Avr. Temperatura:
                {" 17" || Math.round(weather.hours[0].airTemperature.dwd)} ºC
            </p>
        </div>
    );
}
