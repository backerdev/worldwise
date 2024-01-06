import styles from "./CityList.module.css";
import Spinner from "../Spinner";
import CityItem from "../cityitem/CityItem";
import Message from "../Message";
export default function CityList({ cities, isLoading }) {
  console.log(cities);
  console.log(isLoading);
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on thr city on the map" />
    );
  return (
    <ul className={styles.CityList}>
      {cities?.map((city, idx) => (
        <CityItem key={idx} city={city} />
      ))}
    </ul>
  );
}
