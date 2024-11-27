import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { BiUpArrow } from "react-icons/bi";
import { upVotePost } from "../../services/post.services";
import { Post } from "../../types/post.types";
import styles from "./PostUpVoteButton.module.css";

function PostUpVoteButton({ postId, isUpVoted, isDownVoted }) {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => upVotePost(data.postId),
    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: () => {
      const postData = queryClient.getQueryData(["post", postId]);
      if (postData) {
        let updatedVoteCount = postData.voteCount;

        if (!isUpVoted && !isDownVoted) updatedVoteCount += 1;
        else if (isUpVoted) updatedVoteCount -= 1;
        else if (isDownVoted) updatedVoteCount += 2;

        queryClient.setQueryData(["post", postId], {
          ...postData,
          isUpVoted: !isUpVoted,
          isDownVoted: false,
          voteCount: updatedVoteCount,
        });
      }

      queryClient.refetchQueries(["posts"]);
      queryClient.refetchQueries(["user-post"]);
      queryClient.refetchQueries(["bookmarked-post"]);
    },
  });

  const handleUpVote = () => {
    if (!postId || isLoading) return;
    mutate({ postId });
  };

  return (
    <BiUpArrow
      className={`${styles.voteArrow} ${styles.upVote} ${
        isUpVoted ? styles.upVoteActive : ""
      }`}
      onClick={handleUpVote}
    />
  );
}

export default PostUpVoteButton;
