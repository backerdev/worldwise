import { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Button from "../button/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import BackButton from "../backButton/BackButton";
import useUrlPosition from "../../hooks/useUrlPosition";
import Message from "../Message";
import { useCity } from "../../contexts/CityContext _combineReducer";
// import { useCity } from "../../contexts/CityContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [lat, lng] = useUrlPosition();
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeoLocation, setIsLoadingGeoLocation] = useState(false);
  const [geaError, setGeoError] = useState("");
  const [emoji, setEmoji] = useState("");
  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  const { createCity, isLoading } = useCity();

  const navigate = useNavigate();
  useEffect(
    function () {
      async function fetchCityData() {
        if (!lat && !lng) return;
        try {
          setGeoError("");
          setIsLoadingGeoLocation(true);
          // code here

          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );

          const data = await res.json();
          if (!data.city)
            throw new Error(
              "This dosent seem right please click somewhere else 😇 "
            );

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setIsLoadingGeoLocation(false);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (error) {
          setGeoError(error.message);
        } finally {
          setIsLoadingGeoLocation(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );
  if (geaError) return <Message message={geaError} />;
  if (!lat && !lng) return <Message message={"Start by clicking on the map"} />;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app/cities");
  }
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      {/* <div className={styles.row}>
        <input
        id="date"
        onChange={(e) => setDate(e.target.value)}
        value={date}
        />
      </div> */}
      <label htmlFor="date">When did you go to {cityName}?</label>
      <DatePicker
        id="date"
        selected={date}
        onChange={(date) => setDate(date)}
        dateFormat="dd/mm/yyyy"
      />

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
