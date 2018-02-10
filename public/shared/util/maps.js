var googleMapsLoader = require('google-maps');
import {GOOGLE_MAPS_CLIENT_KEY, GOOGLE_MAPS_VERSION, GOOGLE_MAPS_LIBRARIES} from "../constants.js";
googleMapsLoader.KEY = GOOGLE_MAPS_CLIENT_KEY;
// googleMapsLoader.VERSION =  GOOGLE_MAPS_VERSION;
googleMapsLoader.LIBRARIES =  GOOGLE_MAPS_LIBRARIES;

export var GoogleMapsLoader =  googleMapsLoader;
