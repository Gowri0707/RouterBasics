import { useCallback } from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";


const MainNavigation = () => {
  const getActiveClass = useCallback(({ isActive }) => {
    return isActive ? classes.active : "";
  }, []);
  return (
    <header className={classes.header}>
      <div className={classes.logo}>GreatQuotes</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/quotes" className={getActiveClass}>All Quotes</NavLink>
          </li>
          <li>
            <NavLink to="/quotes/new" className={getActiveClass}>Add Quote</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
