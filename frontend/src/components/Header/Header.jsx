import React, { useRef, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";
import { useAppSelector } from "../../redux/store";
import CustomNavLink from "../CustomNavLink/CustomNavLink";
import DropDown from "../DropDown/DropDown";
import LogoutButton from "../LogoutButton/LogoutButton";
import styles from "./Header.module.css";

import { useUser } from "../../context/UserContext";

function Header() {
  // const isLoggedIn = useAppSelector((state) => state.userState.isLoggedIn);
  const { user, role } = useUser();
  // const user = localStorage.getItem('user');
  // const role = localStorage.getItem('role');
  const isLoggedIn = localStorage.getItem("status");
  // const user = useAppSelector((state) => state.userState.user);

  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleCloseNavbar = () => {
    setIsNavOpen(false);
  };

  // Navbar
  const navigationRef = useRef(null);
  useOutsideAlerter(navigationRef, handleCloseNavbar);

  const toggleNav = () => {
    setIsNavOpen((state) => !state);
  };

  return (
    <header className={styles.Header}>
      <div className={`container ${styles.navWrapper}`}>
        <Link to="/" className={styles.heading}>
          Indian Institute of Technology, Bombay
        </Link>
        <button
          type="button"
          onClick={toggleNav}
          className={styles.mobileNavToggle}
          aria-controls="primary-navigation"
        >
          {!isNavOpen ? <RxHamburgerMenu /> : <MdOutlineClose />}
          <span className="visually-hidden">Menu</span>
        </button>

        {/* Div is used to provide backdrop shadow */}
        <div
          className={`${styles.backdrop} ${
            isNavOpen ? styles.backdropOpen : ""
          }`}
        >
          {" "}
        </div>

        <nav
          ref={navigationRef}
          className={`${styles.primaryNavigation} ${
            isNavOpen ? styles.primaryNavigationOpen : ""
          }`}
        >
          <ul className={styles.navList} id="primary-navigation">
            <CustomNavLink
              path="/"
              onClickCallback={handleCloseNavbar}
              className={styles.navItem}
              activeClassName={styles.navItemActive}
            >
              Home
            </CustomNavLink>
            <CustomNavLink
              path="/posts"
              onClickCallback={handleCloseNavbar}
              className={styles.navItem}
              activeClassName={styles.navItemActive}
            >
              Posts
            </CustomNavLink>

            {/* <CustomNavLink
              path="https://resume-e6lb.onrender.com"
              onClickCallback={handleCloseNavbar}
              className={styles.navItem}
              activeClassName={styles.navItemActive}
            >
              Resume
            </CustomNavLink> */}

            {/* Quizzes */}
            <CustomNavLink
              path="/driveslist"
              onClickCallback={handleCloseNavbar}
              className={styles.navItem}
              activeClassName={styles.navItemActive}
            >
              Companies for Placements
            </CustomNavLink>

            {isLoggedIn ? (
              <DropDown
                titleText={`Hi ${user?.first_name}!!`}
                className={styles.navItem}
              >
                <>
                  <CustomNavLink
                    path={`/profile/${user?.id}`}
                    onClickCallback={handleCloseNavbar}
                    className={styles.navItem}
                    activeClassName={styles.navItemActive}
                  >
                    Profile
                  </CustomNavLink>
                  {/* <CustomNavLink
                    path="/user/search"
                    onClickCallback={handleCloseNavbar}
                    className={styles.navItem}
                    activeClassName={styles.navItemActive}
                  >
                    Users
                  </CustomNavLink> */}
                  <LogoutButton
                    className={styles.navItem}
                    onClickCallback={handleCloseNavbar}
                  >
                    Logout
                  </LogoutButton>
                </>
              </DropDown>
            ) : null}
          </ul>
          <div className={styles.buttons}>
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  onClick={handleCloseNavbar}
                  className={`default-button default-outline-button ${styles.authButton}`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={handleCloseNavbar}
                  className={`default-button ${styles.authButton}`}
                >
                  Register
                </Link>
                {/* <Link
                  to="/postedit"
                  onClick={handleCloseNavbar}
                  className={`default-button ${styles.authButton}`}
                >
                  PostEdit
                </Link> */}
              </>
            ) : (
              <Link
                to="/post"
                onClick={handleCloseNavbar}
                className={`default-button ${styles.authButton}`}
              >
                Create Interview Experience
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
