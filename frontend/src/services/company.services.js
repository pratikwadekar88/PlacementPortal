import axios from "axios";
import { BASE_API_URL } from "./serverConfig";
import React from "react";

export const companyRegister = async (name, requirements,avatar) => {
    const url = `${BASE_API_URL}/company/register`;
    const company = { name, requirements,avatar };
    return await axios
      .post(url, company, { withCredentials: true })
      .then((response) => response.data);
  };
    