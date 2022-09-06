import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "../Styles/Nav.module.css";
import api from "../Server";
import { Storage } from "./Storage";

function Nav() {
  const [filteredTitle, setFilteredTitle] = useState([]);
  const [stext, setStext] = useState("");
  const [show, setShow] = useState(false);
  const [bar, setBar] = useState(false);
  const detail = useContext(Storage);
  const searchtitle = async (val) => {
    setStext(val);
    setShow(true);
    const response = await api.get("/notes");
    let arr = response.data.filter((item) =>
      item.title.toLowerCase().includes(val)
    );
    setFilteredTitle(arr);
  };
  // console.log(filteredTitle);
  return (
    <nav className={classes.nav}>
      <div className={classes.hambar}>
        <i
          className={`fa-solid fa-bars ${classes.burger}`}
          onClick={() => setBar(!bar)}
        ></i>
        {bar && (
          <div className={classes.bar}>
            <NavLink
              to={"/"}
              onClick={() => setBar(false)}
              className={({ isActive }) =>
                isActive ? `${classes.active}` : `${classes.inactive}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"/allnotes"}
              onClick={() => setBar(false)}
              className={({ isActive }) =>
                isActive ? `${classes.active}` : `${classes.inactive}`
              }
            >
              Show Notes
            </NavLink>
          </div>
        )}
      </div>
      <h2>Note Maker</h2>
      <ul className={classes.ullist}>
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? `${classes.active}` : `${classes.inactive}`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/allnotes"}
            className={({ isActive }) =>
              isActive ? `${classes.active}` : `${classes.inactive}`
            }
          >
            Show Notes
          </NavLink>
        </li>
      </ul>
      <div className={classes.search}>
        <input
          placeholder="seacrh by title"
          onChange={(event) => {
            searchtitle(event.target.value);
            detail.srch(event.target.value);
          }}
        />
        <i className="fa fa-search" aria-hidden="true"></i>
        {stext && show && (
          <ul className={classes.searchList}>
            {filteredTitle.length===0 && <li>No notes found</li>}
            {filteredTitle.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  detail.searchResult(item, stext);
                  setShow(false);
                }}
              >
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Nav;
