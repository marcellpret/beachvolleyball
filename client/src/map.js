import * as React from "react";
import ReactMapGL, {
    Marker,
    Popup,
    ScaleControl,
    GeolocateControl,
} from "react-map-gl";
import secret from "./secrets.json";

const scaleControlStyle = {
    top: "1rem",
    right: "1rem",
};

const geolocateStyle = {
    top: 0,
    left: 0,
    margin: 10,
};
const positionOptions = { enableHighAccuracy: true };

const ICON = `M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z`;

const ICON_SIZE = 20;

const home = {
    name: "Home",
    longitude: 13.32513734082113,
    latitude: 52.45947396505051,
};

export default function Map() {
    const [showPopup, togglePopup] = React.useState(false);
    const [viewport, setViewport] = React.useState({
        latitude: 52.516806,
        longitude: 13.383309,
        zoom: 10,
    });

    return (
        <ReactMapGL
            {...viewport}
            width="100%"
            height="60vh"
            mapStyle="mapbox://styles/mapbox/outdoors-v11"
            mapboxApiAccessToken={secret.MAP_TOKEN}
            onViewportChange={(viewport) => setViewport(viewport)}
        >
            <ScaleControl style={scaleControlStyle} />
            <GeolocateControl
                style={geolocateStyle}
                positionOptions={positionOptions}
                trackUserLocation
                auto
            />
            <Marker
                key={home.name}
                longitude={home.longitude}
                latitude={home.latitude}
            >
                <svg
                    height={ICON_SIZE}
                    viewBox="0 0 24 24"
                    style={{
                        cursor: "pointer",
                        fill: "fff",
                        stroke: "none",
                        transform: `translate(${
                            -ICON_SIZE / 2
                        }px,${-ICON_SIZE}px)`,
                    }}
                >
                    <path d={ICON} />
                </svg>
                {showPopup && (
                    <Popup
                        latitude={home.latitude}
                        longitude={home.longitude}
                        closeButton={true}
                        closeOnClick={false}
                        onClose={() => togglePopup(false)}
                        anchor="top"
                    >
                        <div>You are here</div>
                    </Popup>
                )}
            </Marker>
        </ReactMapGL>
    );
}
