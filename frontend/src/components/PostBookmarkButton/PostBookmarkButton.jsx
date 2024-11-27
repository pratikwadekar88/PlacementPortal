import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { BsBookmarkDashFill } from "react-icons/bs";
import { toggleBookmark } from "../../services/post.services";
import styles from "./PostBookmarkButton.module.css";

function PostBookmarkButton({ postId, isBookmarked }) {
  const [isBookmarkedPost, setIsBookmarkedPost] = useState(isBookmarked);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => toggleBookmark(data.postId, data.isBookmarkedPost),
    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: () => {
      setIsBookmarkedPost((state) => !state);

      // Manually changing the Post
      const postData = queryClient.getQueryData(["post", postId]);
      if (postData) {
        // Creating a new copy of postData
        queryClient.setQueryData(["post", postId], {
          ...postData,
          isBookmarked: !postData.isBookmarked,
        });
      }

      queryClient.refetchQueries(["posts"]);
      queryClient.refetchQueries(["user-post"]);
      queryClient.refetchQueries(["bookmarked-post"]);
    },
  });

  return (
    <BsBookmarkDashFill
      className={`
        ${styles.bookmark} 
        ${isBookmarkedPost ? styles.bookmarkActive : ""}
        ${isLoading ? styles.bookmarkDisabled : ""}
      `}
      onClick={() => mutate({ postId, isBookmarkedPost })}
    />
  );
}

export default PostBookmarkButton;
