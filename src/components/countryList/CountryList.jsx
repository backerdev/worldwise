import styles from "./CountryList.module.css";
import Spinner from "../Spinner";

import Message from "../Message";
import CountryItem from "../countryItem/CountryItem";
import { useCity } from "../../contexts/CityContext _combineReducer";
// import { useCity } from "../../contexts/CityContext";

export default function CountryList() {
  const { cities, isLoading, countries } = useCity();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on thr city on the map" />
    );

  return (
    <ul className={styles.countryList}>
      {countries?.map((country, idx) => (
        <CountryItem key={idx} countryItem={country} />
      ))}
    </ul>
  );
}
