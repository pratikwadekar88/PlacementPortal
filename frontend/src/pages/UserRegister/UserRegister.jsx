import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import { branches } from "../../assets/data/user.data";
import { degrees } from "../../assets/data/user.data";
import registrationPageImage from "../../assets/images/pages/registration.png";
import RegisterSuccessModal from "../../components/RegisterSuccessModal/RegisterSuccessModal";
import SignInWithGoogle from "../../components/SignInWithGoogle/SignInWithGoogle";
import { registerUser } from "../../services/user.services";
import { User } from "../../types/user.types";
import styles from "./UserRegister.module.css";

function UserRegister() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const { mutate, isLoading } = useMutation({
    mutationFn: (user) => registerUser(user),
    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setIsSuccessModalOpen(true);
    },
  });

  const initialValues = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    // confirmPassword: "",
    branch_name: "",
    degree: "",
    cgpa: "",
    designation: "",
    about: "",
    passing_year: "",
    github: "",
    linkedin: "",
    leetcode: "",
    // collegeId: "",
    // prn: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      // username: Yup.string()
      //   .max(20, "User Name must be 20 characters of less")
      //   .required("Username is required"),
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
      // confirmPassword: Yup.string()
      //   .when("password", {
      //     is: (val) => val && val.length > 0,
      //     then: () =>
      //       Yup.string().oneOf(
      //         [Yup.ref("password")],
      //         "Confirm Password does not match"
      //       ),
      //   })
      //   .required("Confirm Password is required"),
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      branch: Yup.string().required("Branch is required"),
      degree: Yup.string().required("Degree is required"),
      cgpa: Yup.string().required("CGPA is required"),
      designation: Yup.string().required("Designation is required"),
      passing_year: Yup.number().required("Passing Year is required"),
      about: Yup.string().required("About is required"),
      github: Yup.string().url("Invalid github url"),
      linkedin: Yup.string().url("Invalid linkedin url"),
      leetcode: Yup.string().url("Invalid leetcode url"),
      // collegeId: Yup.string().required("College ID is required"),
      // prn: Yup.string().required("PRN is required"),
    }),
    onSubmit: (values) => mutate({ ...values, isAdmin: false }),
  });

  return (
    <>
      <Helmet>
        <title>User registration</title>
      </Helmet>

      <div className={styles.UserRegister}>
        <div className={styles.container}>
          <header className={styles.title}>Registration Form</header>
          {/* <SignInWithGoogle /> */}
          {/* <div className={styles.orLabel}>OR</div> */}
          <form onSubmit={formik.handleSubmit} className={styles.form}>
            {/* <div
              className={`${styles.inputField} ${
                formik.touched.username && formik.errors.username
                  ? styles.inputFieldError
                  : ""
              }`}
            >
              <label htmlFor="username">
                {formik.touched.username && formik.errors.username
                  ? formik.errors.username
                  : "Username"}
                <span className="required">*</span>
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </label>
            </div> */}

            <div
              className={`${styles.inputField} ${
                formik.touched.email && formik.errors.email
                  ? styles.inputFieldError
                  : ""
              }`}
            >
              <label htmlFor="email">
                {formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : "Email"}
                <span className="required">*</span>
                <input
                  type="email"
                  name="email"
                  placeholder="abc@test.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </label>
            </div>

            <div className={styles.column}>
              <div
                className={`${styles.inputField} ${
                  formik.touched.password && formik.errors.password
                    ? styles.inputFieldError
                    : ""
                }`}
              >
                <label htmlFor="password">
                  {formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : "Password"}
                  <span className="required">*</span>
                  <input
                    type="password"
                    name="password"
                    placeholder="*****"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </label>
              </div>

              {/* <div
                className={`${styles.inputField} ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? styles.inputFieldError
                    : ""
                }`}
              >
                <label htmlFor="password">
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? formik.errors.confirmPassword
                    : "Confirm Password"}
                  <span className="required">*</span>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="*****"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </label>
              </div> */}
            </div>

            <div
              className={`${styles.inputField} ${
                formik.touched.first_name && formik.errors.first_name
                  ? styles.inputFieldError
                  : ""
              }`}
            >
              <label htmlFor="first_name">
                {formik.touched.first_name && formik.errors.first_name
                  ? formik.errors.first_name
                  : "First name"}
                <span className="required">*</span>
                <input
                  type="text"
                  name="first_name"
                  placeholder="Enter your first name"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </label>
            </div>

            <div
              className={`${styles.inputField} ${
                formik.touched.last_name && formik.errors.last_name
                  ? styles.inputFieldError
                  : ""
              }`}
            >
              <label htmlFor="last_name">
                {formik.touched.last_name && formik.errors.last_name
                  ? formik.errors.last_name
                  : "Last name"}
                <span className="required">*</span>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Enter your last name"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </label>
            </div>

            <div
              className={`${styles.inputField} ${
                formik.touched.branch && formik.errors.branch
                  ? styles.inputFieldError
                  : ""
              }`}
            >
              <label htmlFor="branch">
                {formik.touched.branch && formik.errors.branch
                  ? formik.errors.branch
                  : "Branch"}
                <span className="required">*</span>

                <select
                  name="branch"
                  className={styles.inputField}
                  value={formik.values.branch}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Branch</option>
                  {branches.map((branch) => (
                    <option value={branch} key={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div
              className={`${styles.inputField} ${
                formik.touched.degree && formik.errors.degree
                  ? styles.inputFieldError
                  : ""
              }`}
            >
              <label htmlFor="degree">
                {formik.touched.degree && formik.errors.degree
                  ? formik.errors.degree
                  : "Degree"}
                <span className="required">*</span>

                <select
                  name="degree"
                  className={styles.inputField}
                  value={formik.values.degree}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Degree</option>
                  {degrees.map((degree) => (
                    <option value={degree} key={degree}>
                      {degree}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div
              className={`${styles.inputField} ${
                formik.touched.cgpa && formik.errors.cgpa
                  ? styles.inputFieldError
                  : ""
              }`}
            >
              <label htmlFor="cgpa">
                {formik.touched.cgpa && formik.errors.cgpa
                  ? formik.errors.cgpa
                  : "CGPA"}
                <span className="required">*</span>
                <input
                  type="text"
                  name="cgpa"
                  placeholder="Enter CGPA"
                  value={formik.values.cgpa}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </label>
            </div>

            {/* <div
              className={`${styles.inputField} ${
                formik.touched.collegeId && formik.errors.collegeId
                  ? styles.inputFieldError
                  : ""
              }`}
            >
              <label htmlFor="collegeId">
                {formik.touched.collegeId && formik.errors.collegeId
                  ? formik.errors.collegeId
                  : "College ID"}
                <span className="required">*</span>
                <input
                  type="text"
                  name="collegeId"
                  placeholder="C2K2"
                  value={formik.values.collegeId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </label>
            </div> */}

            {/* <div
              className={`${styles.inputField} ${
                formik.touched.prn && formik.errors.prn
                  ? styles.inputFieldError
                  : ""
              }`}
            >
              <label htmlFor="prn">
                {formik.touched.prn && formik.errors.prn
                  ? formik.errors.prn
                  : "PRN"}
                <span className="required">*</span>
                <input
                  type="text"
                  name="prn"
                  placeholder="PRN NO"
                  value={formik.values.prn}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </label>
            </div> */}

            <div
              className={`${styles.inputField} ${
                formik.touched.designation && formik.errors.designation
                  ? styles.inputFieldError
                  : ""
              }`}
            >
              <label htmlFor="designation">
                {formik.touched.designation && formik.errors.designation
                  ? formik.errors.designation
                  : "Designation"}
                <span className="required">*</span>
                <input
                  type="text"
                  name="designation"
                  placeholder="SDE 1 or Student"
                  value={formik.values.designation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </label>
            </div>

            <div
              className={`${styles.inputField} ${
                formik.touched.passing_year && formik.errors.passing_year
                  ? styles.inputFieldError
                  : ""
              }`}
            >
              <label htmlFor="passing_year">
                {formik.touched.passing_year && formik.errors.passing_year
                  ? formik.errors.passing_year
                  : "Passing Year"}
                <span className="required">*</span>
                <input
                  type="text"
                  name="passing_year"
                  placeholder="Enter the year"
                  value={formik.values.passing_year}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </label>
            </div>

            <div
              className={`${styles.inputField} ${
                formik.touched.about && formik.errors.about
                  ? styles.inputFieldError
                  : ""
              }`}
            >
              <label htmlFor="about">
                {formik.touched.about && formik.errors.about
                  ? formik.errors.about
                  : "About"}
                <span className="required">*</span>
                <textarea
                  name="about"
                  id="about"
                  placeholder="Introduce yourself..."
                  value={formik.values.about}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </label>
            </div>

            <div
              className={`${styles.inputField} ${
                formik.touched.github && formik.errors.github
                  ? styles.inputFieldError
                  : ""
              }`}
            >
              <label htmlFor="github">
                Github
                <input
                  type="url"
                  name="github"
                  placeholder="https://github.com/user"
                  value={formik.values.github ? formik.values.github : ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </label>
            </div>

            <div
              className={`${styles.inputField} ${
                formik.touched.linkedin && formik.errors.linkedin
                  ? styles.inputFieldError
                  : ""
              }`}
            >
              <label htmlFor="linkedin">
                LinkedIn
                <input
                  type="url"
                  name="linkedin"
                  placeholder="https://linkedin.com/user"
                  value={formik.values.linkedin ? formik.values.linkedin : ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </label>
            </div>

            <div
              className={`${styles.inputField} ${
                formik.touched.leetcode && formik.errors.leetcode
                  ? styles.inputFieldError
                  : ""
              }`}
            >
              <label htmlFor="leetcode">
                Leetcode
                <input
                  type="url"
                  name="leetcode"
                  placeholder="https://leetcode.com/user"
                  value={formik.values.leetcode ? formik.values.leetcode : ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </label>
            </div>

            <input
              type="submit"
              value="Register"
              className={styles.registerButton}
              disabled={isLoading}
            />
          </form>

          <div className={styles.loginSignUp}>
            <span className={styles.signUpText}>
              <span>Already have an Account ?</span>
              <Link to="/login">Log in</Link>
            </span>
          </div>

          {isSuccessModalOpen ? <RegisterSuccessModal /> : null}
        </div>
      </div>
    </>
  );
}

export default UserRegister;
