// import logo from './logo.svg';
import "./css/App.scss";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Map from "./map";
import Weather from "./weather";
import { useDispatch, useSelector } from "react-redux";
import InfoNewCourt from "./infoNewCourt";
import { getMarkers } from "./redux/markers/slice";

function App() {
    const dispatch = useDispatch();

    const statePopup = useSelector((state) => state.togglePopup);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("/api/markers");
                dispatch(getMarkers(data));
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
                <p>or add one in the map below</p>
            </header>
            <Map />
            <Weather />
            {statePopup && <InfoNewCourt />}
        </main>
    );
}

export default App;
