import React from "react";
import { Link, useLocation } from "react-router-dom";

function CustomNavLink({
  path,
  onClickCallback,
  children,
  className,
  activeClassName,
}) {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <li
      role="list"
      className={`${className} ${isActive ? activeClassName : ""}`}
    >
      <Link to={path} onClick={onClickCallback}>
        {children}
      </Link>
    </li>
  );
}

export default CustomNavLink;
