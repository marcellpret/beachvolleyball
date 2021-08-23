import * as React from "react";
import ReactMapGL, {
    Marker,
    NavigationControl,
    ScaleControl,
} from "react-map-gl";
import secret from "./secrets.json";

export default function Map() {
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
            mapboxApiAccessToken={secret.MAP_TOKEN}
            onViewportChange={(viewport) => setViewport(viewport)}
        />
    );
}
