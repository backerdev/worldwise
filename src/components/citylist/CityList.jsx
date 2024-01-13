import styles from "./CityList.module.css";
import Spinner from "../Spinner";
import CityItem from "../cityitem/CityItem";
import Message from "../Message";
import { useCity } from "../../contexts/CityContext _combineReducer";

// import { useCity } from "../../contexts/CityContext";

export default function CityList() {
  const { cities, isLoading } = useCity();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on thr city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities?.map((city, idx) => (
        <CityItem key={idx} city={city} />
      ))}
    </ul>
  );
}
