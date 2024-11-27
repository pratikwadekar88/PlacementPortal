import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { BiDownArrow } from "react-icons/bi";
import { downVotePost } from "../../services/post.services";
import { Post } from "../../types/post.types";
import styles from "./PostDownVoteButton.module.css";
import React from "react";


function PostDownVoteButton({ postId, isUpVoted, isDownVoted }) {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => downVotePost(data.postId),
    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: () => {
      const postData = queryClient.getQueryData(["post", postId]);
      if (postData) {
        let updatedVoteCount = postData.voteCount;

        if (!isUpVoted && !isDownVoted) updatedVoteCount -= 1;
        else if (isUpVoted) updatedVoteCount -= 2;
        else if (isDownVoted) updatedVoteCount += 1;

        queryClient.setQueryData(["post", postId], {
          ...postData,
          isDownVoted: !isDownVoted,
          isUpVoted: false,
          voteCount: updatedVoteCount,
        });
      }

      queryClient.refetchQueries(["posts"]);
      queryClient.refetchQueries(["user-post"]);
      queryClient.refetchQueries(["bookmarked-post"]);
    },
  });

  const handleDownVote = () => {
    if (!postId || isLoading) return;
    mutate({ postId });
  };

  return (
    <BiDownArrow
      className={`${styles.voteArrow} ${styles.downVote} ${
        isDownVoted ? styles.downVoteActive : ""
      }`}
      onClick={handleDownVote}
    />
  );
}

export default PostDownVoteButton;
