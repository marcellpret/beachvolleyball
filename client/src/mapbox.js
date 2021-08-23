import GeocoderService from "@mapbox/mapbox-sdk/services/geocoding";
import secret from "./secrets.json";

export const accessToken = secret.MAP_TOKEN;

export const geocoder = GeocoderService({
    accessToken,
});
