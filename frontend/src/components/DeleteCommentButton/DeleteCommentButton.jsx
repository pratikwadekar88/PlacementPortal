import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useAppSelector } from "../../redux/store";
import styles from "./DeleteCommentButton.module.css";
import { deleteComment } from "../../services/comments.services";

function DeleteCommentButton({ postId, commentId, authorId }) {
  const queryClient = useQueryClient();

  const user = useAppSelector((state) => state.userState.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate, isLoading } = useMutation({
    mutationFn: () => deleteComment(postId, commentId),
    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: () => {
      queryClient.refetchQueries(["comments", postId]);
      toast.success("Comment Deleted Successfully");
    },
  });

  // If the use is not a admin and also not the author then don't show delete
  if (!user?.isAdmin && user?.userId !== authorId) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className={styles.deleteButton}
        onClick={() => setIsModalOpen(true)}
        disabled={isLoading}
      >
        <MdDeleteOutline />
      </button>

      {isModalOpen ? (
        <div className={styles.DeleteModal}>
          <div className={styles.container}>
            <h2>Confirm Comment Delete</h2>
            <p>Are you sure you want to delete this comment</p>
            <div>
              <button
                type="button"
                className={styles.modalCloseButton}
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
              <button
                type="button"
                className={styles.modalDeleteButton}
                onClick={() => mutate()}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default DeleteCommentButton;
