import React from "react";
import { Formik } from "formik";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import {BACKEND_API_URL} from "../../services/serverConfig"

import styles from "./PostForm.module.css";

function InterviewPostForm() {
  const navigate = useNavigate();
  const onSubmitData = async (data) => {
    const url = `${BACKEND_API_URL}/posts/`;

    // Retrieve the token (replace this with your storage method)
    const token = localStorage.getItem("accessToken");

    return await axios
      .post(
        url,data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json", // Optional, in case you need to set the content type
            Authorization: `Bearer ${token}`, // Include Bearer token in the Authorization header
            Accept: "application/json"
          }
        }
        
      )
      .then((response) => {if (response.data) {navigate("/posts"); }} )
      .catch((error) => {
        console.error("Error fetching user profile stats:", error);
        throw error; // Re-throw the error for further handling
      });
  };
  // Fetching in Position and Companies

  const initialValues = {
    title: "",
    content: "",
  
  };

  return (
    <>
      <Helmet>
        <title>Share Interview Experience</title>
      </Helmet>

      <div className={styles.PostForm}>
        <div className={styles.container}>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
              title: Yup.string().required("Job Title is required"),
              content: Yup.string().required("Company Overview is required")
            })}
            onSubmit={(values) => onSubmitData(values)}
          >
            {(formik) => (
              <form
                onSubmit={formik.handleSubmit}
                className={styles.form}
                action=""
              >
                <header className={styles.title}>Share Interview Experience</header>

                <div
                  className={`${styles.inputField} ${
                    formik.touched.title && formik.errors.title
                      ? styles.inputFieldError
                      : ""
                  }`}
                >
                  <label htmlFor="title">
                    Title
                    <span className="required">*</span>
                    <input
                      type="text"
                      name="title"
                      placeholder="Software Engineer"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </label>
                </div>

                <div
                  className={`${styles.inputField} ${
                    formik.touched.content && formik.errors.content
                      ? styles.inputFieldError
                      : ""
                  }`}
                >
                  <label htmlFor="content">
                    Post content
                    <span className="required">*</span>
                    <textarea
                      name="content"
                      placeholder="Brief description of XYZ Tech"
                      value={formik.values.content}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </label>
                </div>

                <div className={styles.column}>
                  <input
                    className={styles.registerButton}
                    type="submit"
                    value="Save"
                  />
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default InterviewPostForm;
