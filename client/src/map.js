import { useState } from "react";
import ReactMapGL, {
    Marker,
    Popup,
    ScaleControl,
    GeolocateControl,
} from "react-map-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import secret from "./secrets.json";
import { useDispatch, useSelector } from "react-redux";
import { togglePopup } from "./redux/new_court/slice";
import { newPin } from "./redux/pin/slice";
import { toggleInfo } from "./redux/info/slice";

const scaleControlStyle = {
    top: "1rem",
    right: "1rem",
};

const geocoder = new MapboxGeocoder({
    accessToken: secret.MAP_TOKEN,
    mapboxgl: ReactMapGL,
});

console.log("geocoder: ", geocoder);

const geolocateStyle = {
    top: 0,
    left: 0,
    margin: 10,
};
const positionOptions = { enableHighAccuracy: true };

const ICON = `M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z`;

const ICON_SIZE = 30;

// const home = {
//     name: "Home",
//     longitude: 13.32513734082113,
//     latitude: 52.45947396505051,
// };

export default function Map(props) {
    const dispatch = useDispatch([]);
    const markers = useSelector((state) => state.markers);
    const pin = useSelector((state) => state.pin);

    const location = props.location;

    console.log("props.location: ", props.location);

    function openNewCourt(e) {
        console.log("e: ", e.lngLat);
        dispatch(togglePopup(true));
        dispatch(newPin(e.lngLat));
        // setMarker(e.lngLat);
    }

    function openInfo(idMarker) {
        dispatch(toggleInfo(true, idMarker));
        dispatch(togglePopup(false));
        dispatch(newPin([]));
    }

    function viewportChange(newLocation) {
        props.updateLocation(newLocation);
    }

    // function closeNewCourt(e) {
    //     e.stopPropagation();
    //     dispatch(togglePopup(false));
    // }

    return (
        <div className="map">
            <ReactMapGL
                {...location}
                width="100%"
                height="100%"
                mapStyle="mapbox://styles/mapbox/outdoors-v11"
                mapboxApiAccessToken={secret.MAP_TOKEN}
                onViewportChange={(location) => viewportChange(location)}
                onClick={openNewCourt}
            >
                <ScaleControl style={scaleControlStyle} />
                <GeolocateControl
                    style={geolocateStyle}
                    positionOptions={positionOptions}
                    trackUserLocation
                    // auto
                />
                {markers.length !== 0 &&
                    markers.map((marker) => (
                        <Marker
                            key={marker.id}
                            longitude={parseFloat(marker.lng)}
                            latitude={parseFloat(marker.lat)}
                            onClick={() => openInfo(marker.id)}
                        >
                            <svg
                                height={ICON_SIZE}
                                viewBox="0 0 24 24"
                                style={{
                                    cursor: "pointer",
                                    fill: "slateblue",
                                    stroke: "none",
                                    transform: `translate(${
                                        -ICON_SIZE / 2
                                    }px,${-ICON_SIZE}px)`,
                                }}
                            >
                                <path d={ICON} />
                            </svg>
                        </Marker>
                    ))}
                {pin.length !== 0 && (
                    <Marker
                        longitude={pin[0]}
                        latitude={pin[1]}
                        // onClick={closeNewCourt}
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
                    </Marker>
                )}
            </ReactMapGL>
        </div>
    );
}
