import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./country.module.css";
const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
  const country = await res.json();
  return country;
};
const Country = ({ country }) => {
  const [borders, setBorders] = useState([]);
  const getBorderCountries = async () => {
    const borders = await Promise.all(
      country.borders.map((border) => getCountry(border))
    );
    setBorders(borders);
  };
  useEffect(() => {
    getBorderCountries();
  }, []);
  return (
    <Layout title={country.name}>
      <div className={styles.container}>
        <div className={styles.container_left}>
          <div className={styles.overview_panel}>
            <img src={country.flag} alt={country.name} />
            <h1 className={styles.overview_name}>{country.name}</h1>
            <div className={styles.overview_region}>{country.region}</div>
            <div className={styles.overview_numbers}>
              <div className={styles.overview_population}>
                <div className={styles.overview_value}>
                  {country.population}
                </div>
                <div className={styles.overview_label}>Population</div>
              </div>

              <div className={styles.overview_area}>
                <div className={styles.overview_value}>{country.area}</div>
                <div className={styles.overview_label}>Area</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container_right}>
          <div className={styles.detail_panel}>
            <h4 className={styles.detail_heading}>Details</h4>
            <div className={styles.detail_row}>
              <div className={styles.detail_label}>Capital</div>
              <div className={styles.detail_value}>{country.capital}</div>
            </div>
            <div className={styles.detail_row}>
              <div className={styles.detail_label}>Subregion</div>
              <div className={styles.detail_value}>{country.subregion}</div>
            </div>
            <div className={styles.detail_row}>
              <div className={styles.detail_label}>Languages</div>
              <div className={styles.detail_value}>
                {country.languages.map(({ name }) => name).join(", ")}
              </div>
            </div>
            <div className={styles.detail_row}>
              <div className={styles.detail_label}>Currencies</div>
              <div className={styles.detail_value}>
                {country.currencies.map(({ name }) => name).join(", ")}
              </div>
            </div>
            <div className={styles.detail_row}>
              <div className={styles.detail_label}>Native name</div>
              <div className={styles.detail_value}>{country.nativeName}</div>
            </div>
            <div className={styles.detail_row}>
              <div className={styles.detail_label}>Gini</div>
              <div className={styles.detail_value}>{country.gini} %</div>
            </div>
            <div className={styles.detail_borders}>
              <div className={styles.detail_borders_label}>
                Neigbouring Countries
              </div>
              <div className={styles.detail_borders_container}>
                {borders.map(({ flag, name }) => (
                  <div className={styles.detail_borders_country} key={name}>
                    <img src={flag} alt={name} />
                    <div className={styles.detail_borders_name}>{name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Country;
export const getStaticPaths = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();
  const paths = countries.map((country) => ({
    params: {
      id: country.alpha3Code,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps = async ({ params }) => {
  const country = await getCountry(params.id);
  return {
    props: {
      country,
    },
  };
};
