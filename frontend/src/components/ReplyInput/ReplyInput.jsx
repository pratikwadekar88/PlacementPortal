import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createReplyComment } from "../../services/comments.services";
import styles from "./ReplyInput.module.css";

function ReplyInput({ postId, commentId }) {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) =>
      createReplyComment(data.postId, data.commentId, data.content),
    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: () => {
      setContent("");
      toast.success("Comment Created");
      queryClient.refetchQueries(["replies", postId, commentId]);
    },
  });

  return (
    <form className={styles.replyContainer}>
      <textarea
        placeholder="Add a reply..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={styles.replyBox}
      />

      <button
        type="button"
        disabled={isLoading}
        onClick={() => mutate({ postId, commentId, content })}
        className={`default-button ${styles.replyButton}`}
      >
        Reply
      </button>
    </form>
  );
}

export default ReplyInput;
