// import logo from './logo.svg';
import "./css/App.scss";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Map from "./map";
import Weather from "./weather";

function App() {
    const [data, setData] = useState("");
    console.log("data in App: ", data);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("/api");
                setData(data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <main>
            <header>
                <h1>Find your court</h1>
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Enter a Postcode"
                />
            </header>
            <Map />
            <Weather />
        </main>
    );
}

export default App;
