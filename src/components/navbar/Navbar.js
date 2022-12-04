import "./navbar.css";
import React from "react";
import { HomeRounded, PersonRounded, AddRounded } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";

function Navbar() {
  const { pathname } = useLocation();
  const {
    state: { user },
  } = Context();

  const userData = user?.data();

  return (
    <div className="bottom__nav">
      <Link
        to={"/"}
        className={pathname === "/" ? "active-link" : "default-link"}
      >
        <HomeRounded />
      </Link>

      <Link
        to={userData ? `/${userData?.uid}/new-post` : "/login"}
        className="nav__add-icon"
      >
        <AddRounded />
      </Link>

      <Link
        to={userData ? `/${userData?.uid}/account` : "/login"}
        className={
          pathname === `/${userData?.uid}/account`
            ? "active-link"
            : "default-link"
        }
      >
        <PersonRounded />
      </Link>
    </div>
  );
}

export default Navbar;
