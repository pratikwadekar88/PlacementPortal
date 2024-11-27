import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import userListImage from "../../assets/images/pages/user-list.png";
import { searchUser } from "../../services/user.services";
import styles from "./UserSearch.module.css";

function UserSearch() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  useEffect(() => {
    let fetching = false;
    const fetchData = async () => {
      setIsLoading(true);
      const response = await searchUser(search, 1, 15);
      setData(response.data);
      setHasNextPage(response.page.nextPage);
      setIsLoading(false);
    };

    fetchData();

    const onScroll = async (event) => {
      if (!event.target) return;

      const target = event.target.documentElement;
      const scrollHeight = target.scrollHeight;
      const scrollTop = target.scrollTop;
      const clientHeight = target.clientHeight;
      const scrollHeightRemaining = scrollHeight - scrollTop;

      if (!fetching && scrollHeightRemaining <= clientHeight * 1.5) {
        fetching = true;
        setIsFetchingNextPage(true);
        if (hasNextPage) {
          const nextPageData = await searchUser(search, hasNextPage, 15);
          setData((prevData) => [...prevData, ...nextPageData.data]);
          setHasNextPage(nextPageData.page.nextPage);
        }
        setIsFetchingNextPage(false);
        fetching = false;
      }
    };

    // document.addEventListener("scroll", onScroll);

    return () => document.removeEventListener("scroll", onScroll);
  }, [search, hasNextPage]);

  async function handleSearchInputChange(e) {
    setSearch(e.target.value);
  }

  const isEmpty = data?.length === 0;
  let scrollFooterElement = <p>Nothing More to Load</p>;
  if (isFetchingNextPage || isLoading) {
    scrollFooterElement = <p>Loading...</p>;
  }

  return (
    <>
      <Helmet>
        <title>User List | Interview Experience</title>
        <meta
          name="description"
          content="Search seniors and alumni and connect with them on Interview Experience PICT"
        />
        <meta name="twitter:card" content={userListImage} />
        <meta name="twitter:title" content="User List | Interview Experience" />
        <meta
          name="twitter:description"
          content="Search seniors and alumni and connect with them on Interview Experience PICT"
        />
        <meta name="twitter:image" content={userListImage} />

        <meta property="og:title" content="User List | Interview Experience" />
        <meta
          property="og:description"
          content="Search seniors and alumni and connect with them on Interview Experience PICT"
        />
        <meta property="og:image" content={userListImage} />
        <meta
          property="og:url"
          content={`${import.meta.env.VITE_BASE_CLIENT_URL}/user/search`}
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className={styles.UserSearch}>
        <div className="container">
          <h2>User Search</h2>
          <div className={styles.searchBar}>
            <input
              type="text"
              className={styles.searchBarInput}
              placeholder="Search..."
              onChange={handleSearchInputChange}
            />
          </div>

          {isEmpty ? (
            <div className={styles.listContainer}>
              <p>-- No User found --</p>
            </div>
          ) : null}
          {!isEmpty && !isLoading ? (
            <>
              <table className={styles.userTable}>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Designation</th>
                    <th>Branch</th>
                    <th>Passing Year</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((user) => (
                    <tr className={styles.item} key={user._id}>
                      <td>
                        <Link
                          to={`/profile/${user._id}`}
                          className={styles.username}
                        >
                          {user.username}
                        </Link>
                      </td>
                      <td>{user.designation}</td>
                      <td>{user.branch}</td>
                      <td>{user.passingYear}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={styles.scrollFooter}>{scrollFooterElement}</div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default UserSearch;
