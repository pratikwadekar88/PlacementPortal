import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { createComment } from '../../services/comments.services';
import styles from './CommentInput.module.css';

function CommentInput({ postId }) {
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => createComment(data.postId, data.content),
    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: () => {
      setContent('');
      toast.success('Comment Created');
      queryClient.refetchQueries(['comments']);
    },
  });

  return (
    <form className={styles.commentContainer}>
      <textarea
        placeholder="Add a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={styles.commentBox}
      />

      <button
        type="button"
        disabled={isLoading}
        onClick={() => mutate({ postId, content })}
        className={`default-button ${styles.commentButton}`}
      >
        Comment
      </button>
    </form>
  );
}

export default CommentInput;

