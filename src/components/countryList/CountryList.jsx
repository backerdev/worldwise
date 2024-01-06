import styles from "./CountryList.module.css";
import Spinner from "../Spinner";

import Message from "../Message";
import CountryItem from "../countryItem/CountryItem";
export default function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on thr city on the map" />
    );

  // const countries = cities.reduce((acc,cur)=>if() ,[])
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries?.map((country, idx) => (
        <CountryItem key={idx} countryItem={country} />
      ))}
    </ul>
  );
}
