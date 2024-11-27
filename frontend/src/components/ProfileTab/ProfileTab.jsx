import React, { useState } from "react";

import BookmarkedPost from "../BookmarkedPost/BookmarkedPost";

import UserPost from "../UserPost/UserPost";

import styles from "./ProfileTab.module.css";

// import { useAppDispatch, useAppSelector } from "../../redux/store";
// import { bookmarkAction } from "../../redux/bookmark/bookmarkState";

function ProfileTab() {
  const [toggleState, setToggleState] = useState(1);
  // const dispatch = useAppDispatch();

  const toggleTab = (index) => {
    setToggleState(index);
    // dispatch(bookmarkAction.setIsToggled());
  };

  return (
    <div className={styles.ProfileTab}>
      <div className={styles.blockTabs}>
        <button
          type="button"
          className={
            toggleState === 1
              ? `${styles.tabs} ${styles.activeTab}`
              : `${styles.tabs}`
          }
          onClick={() => {
            toggleTab(1);
            window.location.reload();
          }}
        >
          <h3>Posts</h3>
        </button>
        {/* <button
          type="button"
          className={
            toggleState === 2
              ? `${styles.tabs} ${styles.activeTab}`
              : `${styles.tabs}`
          }
          onClick={() => toggleTab(2)}
        >
          <h3>Bookmarks</h3>
        </button> */}
      </div>

      <div className={styles.contentTabs}>
        <div
          className={
            toggleState === 1
              ? `${styles.content} ${styles.activeContent}`
              : `${styles.content}`
          }
        >
          <UserPost />
        </div>

        {/* <div
          className={
            toggleState === 2
              ? `${styles.content} ${styles.activeContent}`
              : `${styles.content}`
          }
        >
          <BookmarkedPost />
        </div> */}
      </div>
    </div>
  );
}

export default ProfileTab;
