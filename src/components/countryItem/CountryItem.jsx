import styles from "./CountryItem.module.css";

function CountryItem({ countryItem }) {
  const { emoji, country } = countryItem;
  return (
    <li className={styles.countryItem}>
      <span>{emoji}</span>
      <span>{country}</span>
    </li>
  );
}

export default CountryItem;
