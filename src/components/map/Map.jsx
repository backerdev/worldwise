import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
// import { useCity } from "../../contexts/CityContext";

import { useGeoLocation } from "../../hooks/useGeoLocation";
import Button from "../button/Button";
import useUrlPosition from "../../hooks/useUrlPosition";
import { useCity } from "../../contexts/CityContext _combineReducer";
import { useAuth } from "../../contexts/FakeAuthContext";

export default function Map() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { cities } = useCity();
  const [mLat, mLng] = useUrlPosition();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getLocation,
  } = useGeoLocation();

  // const navigate = useNavigate();
  //  onClick={() => {
  //   navigate("form");
  // }}
  useEffect(
    function () {
      if (mLat && mLat) return setMapPosition([mLat, mLng]);
      else return;
    },
    [mLat, mLng]
  );
  useEffect(
    function () {
      if (geoLocationPosition) {
        setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
      } else return;
    },
    [geoLocationPosition]
  );
  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getLocation}>
          {isLoadingPosition ? "Loading.." : " Use your location."}
        </Button>
      )}
      {!isAuthenticated && navigate("/")}

      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={3}
        scrollWheelZoom={true}
      >
        <TileLayer
          onClick={(e) => DetactClick(e)}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.country}
          >
            <Popup>
              <span>{city.country}</span> <br /> <span>{city.notes}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetactClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position).setZoom(13);
  return null;
}

function DetactClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
