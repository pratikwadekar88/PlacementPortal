import axios from "axios";
import getTagsFromString from "../utils/getTagsFromString";
import { BASE_API_URL } from "./serverConfig";
import { BACKEND_API_URL } from "./serverConfig";



export const getDriveDetails = async (id) => {
    const url = `${BASE_API_URL}/drives/${id}`;
    return await axios
        .get(`${url}`)
        .then((res) => res.data.post);
};

export const getDriveById = async (id) => {
  const url = `${BASE_API_URL}/drives/${id}`;
  return await axios
    .get(url.href, { 
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      })
    .then((res) => res.data)
};

export const getDrives = async () => {
    // const url = new URL(`${BASE_API_URL}/posts`);
    const accessToken = localStorage.getItem("accessToken");
    const url = new URL(`${BACKEND_API_URL}/company-posts/list/`);

    return await axios
    .get(url.href, { 
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      })
    .then((res) => res.data)
};
export const createDrive = async (data) => {
  try {
    // console.log(data);
    const accessToken = localStorage.getItem("accessToken");
    const url = new URL(`${BACKEND_API_URL}/company-posts/`);

    const body = {
      ...data,
    };

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return await axios.post(url, body, { headers })  // Correctly pass headers as the third argument
      .then((response) => response.data);
  } catch (error) {
    console.error("Error creating drive post", error);
    throw error;
  }
};
export const updateDrivePost = async (id, data) => {
  try {
    console.log(data);
    const accessToken = localStorage.getItem("accessToken");
    const url = new URL(`${BACKEND_API_URL}/company-posts/`);

    const body = {
      ...data,
      id,
    };

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return await axios.put(url, body, { headers })  // Correctly pass headers as the third argument
      .then((response) => response.data);
  } catch (error) {
    console.error("Error updating drive post", error);
    throw error;
  }
};



export const deleteDrivePost = async (id) => {
  try {
    const accessToken = localStorage.getItem("accessToken"); // Get the access token from localStorage
    const url = `${BACKEND_API_URL}/company-posts/delete/${id}/`; // Construct the URL to delete a specific post by id

    const headers = {
      Authorization: `Bearer ${accessToken}`, // Set the Authorization header with Bearer token
    };

    // Perform DELETE request using axios
    const response = await axios.delete(url, { headers });

    // Return the response data (optional, depending on what the API returns)
    return response.data;
  } catch (error) {
    console.error("Error deleting drive post", error); // Log the error
    throw error; // Rethrow the error so the caller can handle it
  }
};


export const getApplicantsTable = async (id) => {
  try {
    const accessToken = localStorage.getItem("accessToken"); // Get the access token from localStorage
    const url = `${BACKEND_API_URL}/company-posts/jobapplications/${id}/`; // Construct the URL to delete a specific post by id

    const headers = {
      Authorization: `Bearer ${accessToken}`, // Set the Authorization header with Bearer token
    };

    // Perform DELETE request using axios
    const response = await axios.get(url, { headers });

    // Return the response data (optional, depending on what the API returns)
    return response.data;
  } catch (error) {
    console.error("Error deleting drive post", error); // Log the error
    throw error; // Rethrow the error so the caller can handle it
  }
};
// const [alert, setAlert] = useState({ show: false, variant: "", message: "" });
export const applyOnDrivePost = async (id) => {

    const accessToken = localStorage.getItem("accessToken"); // Get the access token from localStorage
    const url = `${BACKEND_API_URL}/company-posts/apply/${id}/`; // Construct the URL to delete a specific post by id

    const headers = {
      Authorization: `Bearer ${accessToken}`, // Set the Authorization header with Bearer token
    };

    // Perform DELETE request using axios
    // const response = await axios.post(url, {}, { headers });
    try {
      const response = await axios.post(url, {}, { headers });
      return response; // Return the response for handling in the component
    } catch (error) {
      throw error; // Rethrow error for the component to handle
    }
};
