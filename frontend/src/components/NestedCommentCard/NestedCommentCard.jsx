import { Link } from "react-router-dom";

import styles from "./NestedCommentCard.module.css";
import { Reply } from "../../types/comment.types";
import getFormattedDate from "../../utils/getFormattedDate";
import DeleteCommentReplyButton from "../DeleteCommentReplyButton/DeleteCommentReplyButton";
import React from "react";

function NestedCommentCard({ postId, commentId, commentReply }) {
  return (
    <div className={styles.nestedComment}>
      <div className={styles.nCmtHead}>
        {commentReply.userId ? (
          <Link
            to={`/profile/${commentReply.userId._id}`}
            className={styles.nUName}
          >
            {commentReply.userId.username}
          </Link>
        ) : (
          <p className={styles.uName}>User Deleted</p>
        )}
        <p className={styles.nDate}>
          {getFormattedDate(commentReply.createdAt)}
        </p>
      </div>

      <p className={styles.nestedCmtData}>{commentReply.content}</p>
      <DeleteCommentReplyButton
        postId={postId}
        commentId={commentId}
        replyId={commentReply._id}
        authorId={commentReply.userId?._id}
      />
    </div>
  );
}

export default NestedCommentCard;
