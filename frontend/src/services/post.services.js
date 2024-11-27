import axios from "axios";
import getTagsFromString from "../utils/getTagsFromString";
import { BASE_API_URL } from "./serverConfig";
import { BACKEND_API_URL } from "./serverConfig";
export const getPost = async (id) => {
  const url = `${BASE_API_URL}/posts/${id}`;
  return await axios
    .get(`${url}`, { withCredentials: true })
    .then((res) => res.data.post);
};

export const getMostViewedPosts = async (limit) => {
  const page = 1;
  const url = new URL(`${BASE_API_URL}/posts`);

  url.searchParams.set("page", page.toString());
  url.searchParams.set("limit", limit.toString());
  url.searchParams.set("sortBy", "views");

  return await axios
    .get(url.href, { withCredentials: true })
    .then((res) => res.data);
};

export const getPostsPaginated = async (page, limit, filter, signal) => {
  // const url = new URL(`${BASE_API_URL}/posts`);
  const accessToken = localStorage.getItem("accessToken");
  const url = new URL(`http://127.0.0.1:8000/company-posts/list-job-posts/`);

  // url.searchParams.set("page", page.toString());
  // url.searchParams.set("limit", limit.toString());

  // if (filter.search.length !== 0) {
  //   url.searchParams.set("search", filter.search);
  // }

  // if (filter.sortBy.length !== 0) {
  //   url.searchParams.set("sortBy", filter.sortBy);
  // }

  // if (filter.articleType.length !== 0) {
  //   url.searchParams.set("articleType", filter.articleType);
  // }

  // if (filter.jobRole.length !== 0) {
  //   url.searchParams.set("jobRole", filter.jobRole);
  // }

  // if (filter.company.length !== 0) {
  //   url.searchParams.set("company", filter.company);
  // }

  // if (filter.rating.length !== 0) {
  //   url.searchParams.set("rating", filter.rating);
  // }

  return await axios
    .get(url.href, { 
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true, signal })
    .then((res) => console.log(res.data))
    .then((data) => {
      const postQueryData = structuredClone(data);
      // if (postQueryData.data.length < limit) {
      //   postQueryData.page.nextPage = undefined;
      // }
      console.log(postQueryData)
      return postQueryData;
    });
};

export const createPost = async (postData, status) => {
  const url = `${BASE_API_URL}/posts`;
  const tags = getTagsFromString(postData.tags);
  const body = { ...postData, tags, status };

  return await axios
    .post(url, body, { withCredentials: true })
    .then((response) => response.data);
};

export const getBookmarkedPostsPaginated = async (userId, page, limit) => {
  const url = new URL(`${BASE_API_URL}/posts/user/bookmarked/${userId}`);
  url.searchParams.set("page", page.toString());
  url.searchParams.set("limit", limit.toString());

  return await axios
    .get(url.href, { withCredentials: true })
    .then((res) => res.data)
    .then((data) => {
      const postQueryData = structuredClone(data);
      if (postQueryData.data.length < limit) {
        postQueryData.page.nextPage = undefined;
      }
      return postQueryData;
    });
};

export const getRelatedPosts = async (postId, limit) => {
  const url = new URL(`${BASE_API_URL}/posts/related/${postId}`);
  url.searchParams.set("limit", limit.toString());

  return await axios
    .get(url.href, { withCredentials: true })
    .then((res) => res.data)
    .then((data) => data.relatedPosts);
};

export const getUserPostPaginated = async (userId, page, limit) => {
  const url = new URL(`${BASE_API_URL}/posts/user/all/${userId}`);
  url.searchParams.set("page", page.toString());
  url.searchParams.set("limit", limit.toString());

  return await axios
    .get(url.href, { withCredentials: true })
    .then((res) => res.data)
    .then((data) => {
      const postQueryData = structuredClone(data);
      if (postQueryData.data.length < limit) {
        postQueryData.page.nextPage = undefined;
      }
      return postQueryData;
    });
};

export const deletePost = async(postId) => {
  const url = `${BASE_API_URL}/posts/${postId}`;

  return await axios
    .delete(url, { withCredentials: true })
    .then((response) => response.data);
};

export const toggleBookmark = async (postId, isBookmarked) => {
  const url = `${BASE_API_URL}/posts/bookmark/${postId}`;

  // Remove the bookmark if already bookmarked
  if (isBookmarked) {
    return axios
      .delete(url, { withCredentials: true })
      .then((response) => response.data);
  }

  // If not bookmarked then bookmark the post
  return await axios
    .post(url, {}, { withCredentials: true })
    .then((response) => response.data);
};

export const getCompanyAndRoleList = async () => {
  const url = new URL(`${BASE_API_URL}/posts/data/company-roles`);

  return await axios.get(url.href).then((res) => res.data);
};

export const editPost = async (editedPostData, postId, status) => {
  const url = `${BASE_API_URL}/posts/edit`;
  const tags = getTagsFromString(editedPostData.tags);
  const body = {
    ...editedPostData,
    tags,
    status,
    postId,
  };

  return await axios
    .put(url, body, { withCredentials: true })
    .then((response) => response.data);
};

export const upVotePost = async (postId) => {
  const authToken = localStorage.getItem("accessToken")

  const url = `${BACKEND_API_URL}/posts/upvote/${postId}/`;

  return await axios
    .post(url, {}, { headers: {
          'Content-Type': 'application/json', // Optional, in case you need to set the content type
          'Authorization': `Bearer ${authToken}`, // Include Bearer token in the Authorization header
          'Accept': 'application/json',
        },withCredentials: true })
    .then((response) => response.data);
};

export const downVotePost = async (postId) => {
  const url = `${BASE_API_URL}/posts/downvote/${postId}`;

  return await axios
    .post(url, {}, { withCredentials: true })
    .then((response) => response.data);
};
