import axios from "axios";
import { BASE_API_URL } from "./serverConfig";
// import { CommentList, ReplyList } from "../types/comment.types";
import React from "react";

export const getCommentsPaginated = async (postId, page, limit) => {
  const url = new URL(`${BASE_API_URL}/comments/${postId}`);

  url.searchParams.set("page", page.toString());
  url.searchParams.set("limit", limit.toString());

  return await axios
    .get(url.href, { withCredentials: true })
    .then((res) => res.data);
};

export const createComment = async (postId, content) => {
  const url = `${BASE_API_URL}/comments/${postId}`;

  const body = { content };

  return await axios
    .post(url, body, { withCredentials: true })
    .then((response) => response.data);
};

export const createReplyComment = async (postId, commentId, content) => {
  const url = `${BASE_API_URL}/comments/replies/${postId}/${commentId}`;

  const body = { content };

  return await axios
    .post(url, body, { withCredentials: true })
    .then((response) => response.data);
};

export const getCommentRepliesPaginated = async (
  postId,
  commentId,
  page,
  limit
) => {
  const url = new URL(
    `${BASE_API_URL}/comments/replies/${postId}/${commentId}`
  );

  url.searchParams.set("page", page.toString());
  url.searchParams.set("limit", limit.toString());

  return await axios
    .get(url.href, { withCredentials: true })
    .then((res) => res.data);
};

export const deleteComment = async (postId, commentId) => {
  const url = `${BASE_API_URL}/comments/${postId}/${commentId}`;

  return await axios
    .delete(url, { withCredentials: true })
    .then((response) => response.data);
};

export const deleteCommentReply = async (postId, commentId, relpyId) => {
  const url = `${BASE_API_URL}/comments/replies/${postId}/${commentId}/${relpyId}`;

  return await axios
    .delete(url, { withCredentials: true })
    .then((response) => response.data);
};
