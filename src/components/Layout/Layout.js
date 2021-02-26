import { Brightness6Rounded } from "@material-ui/icons";
import Head from "next/head";
import Link from "next/link";
import styles from "./Layout.module.css";
import { useEffect, useState } from "react";
const Layout = ({ children, title = "World Ranks" }) => {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("theme")
    );
    setTheme(localStorage.getItem("theme"));
  }, []);
  const switchTheme = () => {
    if (theme == "light") {
      saveTheme("dark");
    } else {
      saveTheme("light");
    }
  };
  const saveTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Link href="/">
          <div>World Ranks</div>
        </Link>
        <button className={styles.themeSwitcher} onClick={switchTheme}>
          <Brightness6Rounded />
        </button>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        Le Nhat Tan @ lenhattan2313@gmail.com
      </footer>
    </div>
  );
};
export default Layout;
