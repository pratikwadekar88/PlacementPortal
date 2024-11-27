import axios from "axios";
import { BASE_API_URL } from "./serverConfig";
import { BACKEND_API_URL } from "./serverConfig";
import React from "react";

export const getUserStatus = async () => {
  const url = `${BASE_API_URL}/user/status`;
  return await axios
    .get(url, { withCredentials: true })
    .then((response) => response.data);
};

// import axios from "axios";
// import { BACKEND_API_URL } from "../config";

// Assuming the token is stored in localStorage or any secure storage
// export const getUserProfileStats = async (userId) => {
//   const url = `${BACKEND_API_URL}/user/profile/${userId}/`;

//   // Retrieve the token (replace this with your storage method)
//   const token = localStorage.getItem("accessToken");

//   return await axios
//     .get(url, {
//       withCredentials: true,
//       headers: {
//         Authorization: `Bearer ${token}`, // Attach the JWT token here
//       },
//     })
//     .then((response) => response.data?.data)
//     .catch((error) => {
//       console.error("Error fetching user profile stats:", error);
//       throw error; // Re-throw the error for further handling
//     });
// };

export const registerUser = async (user) => {
  // const url = `${BASE_API_URL}/user/register`;
  const url = `${BACKEND_API_URL}/user/register/`;
  return await axios.post(url, user).then((response) => {
    console.log(response.data);
  });
};

export const loginUser = async (email, password) => {
  // const url = `${BASE_API_URL}/user/login`;
  const url = `${BACKEND_API_URL}/user/login/`;
  const user = { email, password };
  console.log(user);
  return await axios
    .post(url, user, { withCredentials: true })
    .then((response) => response.data);
};

export const logoutUser = () => {
  // const url = `${BASE_API_URL}/user/logout`;
  // return axios.post(url, {}, { withCredentials: true });
};

export const sendForgotPasswordMail = async (email) => {
  const url = `${BASE_API_URL}/user/forgot-password`;
  const body = { email };
  return await axios
    .post(url, body, { withCredentials: true })
    .then((response) => response.data);
};

export const resetUserPassword = async (email, newPassword, token) => {
  const url = `${BASE_API_URL}/user/reset-password/${token}`;
  const body = { email, newPassword };
  return await axios.post(url, body).then((response) => response.data);
};

export const getUserProfileStats = async (userId) => {
  const token = localStorage.getItem("accessToken");

  const url = `${BACKEND_API_URL}/user/profile/${userId}`;
  return await axios
    .get(url, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}` // Attach the JWT token here
      }
    })
    .then((response) => response.data.data[0]);
};

export const updateUser = async (user) => {
  const url = `${BACKEND_API_URL}/user/profile/`;
  const token = localStorage.getItem("accessToken");
  console.log('Hiiii');
  return await axios
    .patch(url, user, { headers: {
      Authorization: `Bearer ${token}` // Attach the JWT token here
    }})
    .then((response) => response.data);
};

export const searchUser = async (user, page, limit, signal) => {
  const url = new URL(`${BASE_API_URL}/user/search`);
  url.searchParams.set("searchparam", user);
  url.searchParams.set("page", page.toString());
  url.searchParams.set("limit", limit.toString());

  return await axios
    .get(url.href, { withCredentials: true, signal })
    .then((res) => res.data);
};

export const setUserToken = async (token) => {
  const url = `${BASE_API_URL}/user/token/google/${token}`;
  return await axios
    .post(url, {}, { withCredentials: true })
    .then((response) => response.data);
};
