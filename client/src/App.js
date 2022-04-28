// import logo from './logo.svg';
import "./css/App.scss";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Map from "./map";
import Weather from "./weather";
import Info from "./info";
import { useDispatch, useSelector } from "react-redux";
import InfoNewCourt from "./infoNewCourt";
import { getMarkers } from "./redux/markers/slice";
import secret from "./secrets.json";
import logo from "./images/logo.png";

function App() {
    const dispatch = useDispatch();
    const statePopup = useSelector((state) => state.togglePopup);
    const info = useSelector((state) => state.toggleInfo);

    const [search, setSearch] = useState();
    const [location, setLocation] = useState({
        latitude: 52.516806,
        longitude: 13.383309,
        zoom: 10,
    });

    console.log("location: ", location);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("/api/markers");
                console.log("data in App: ", data);

                dispatch(getMarkers(data));
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    function updateLocation(newLocation) {
        setLocation(newLocation);
    }

    async function searchLocation(e) {
        e.preventDefault();
        try {
            const location = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${search.search}.json?access_token=${secret.MAP_TOKEN}`
            );
            console.log("location: ", location);
            setLocation({
                latitude: location.data.features[0].center[1],
                longitude: location.data.features[0].center[0],
                zoom: 15,
            });
        } catch (error) {
            console.log("error in searchLocation: ", error);
        }
    }

    function handleChange({ target }) {
        setSearch({ [target.name]: target.value });
    }

    return (
        <main>
            <header>
                <img className="logo" src={logo} alt="" />
                <form>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        onChange={handleChange}
                        autocomplete="off"
                    />
                    <button className="go" onClick={searchLocation}>
                        GO
                    </button>
                </form>
                <p>or add one in the map below</p>
            </header>
            <Map location={location} updateLocation={updateLocation} />
            {/* <Weather /> */}
            {statePopup && <InfoNewCourt />}
            {info.boolean && <Info />}
        </main>
    );
}

export default App;
