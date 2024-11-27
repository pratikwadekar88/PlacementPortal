import React from "react";
import { toast } from "react-hot-toast";
import styles from "./ShareButton.module.css";

function ShareButton({ title, author, postId }) {
  const handlePostShare = () => {
    const url = `${import.meta.env.VITE_BASE_CLIENT_URL}/post/${postId}`;

    if (navigator.share) {
      const text = `Checkout the post "${title}" by ${author} on Interview Experience`;
      navigator.share({ title, text, url }).catch(() => {
        toast.error("Something went wrong");
      });
    } else {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          toast.success("Link Copied to Clipboard!!");
        })
        .catch(() => {
          toast.error("Unable to Copy to Clipboard!!");
        });
    }
  };

  return (
    <button
      type="button"
      className={styles.shareButton}
      onClick={handlePostShare}
    >
      Share
    </button>
  );
}

export default ShareButton;
