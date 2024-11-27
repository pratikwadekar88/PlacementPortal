import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

import { industries, postTypes } from "../../assets/data/post.data";
import Editor from "../../components/Editor/Editor";
import StarRating from "../../components/StarRating/StarRating";
import {
  editPost,
  getCompanyAndRoleList,
  getPost,
} from "../../services/post.services";
import getStringFromTags from "../../utils/getStringFromTags";
import styles from "./PostEdit.module.css";

export default function PostEdit() {
  const navigate = useNavigate();

  const { id } = useParams();
  const postQuery = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
    staleTime: 30 * 60 * 1000, // Stale time for 30min
  });

  // Invalidating the status and refetching the post data
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.refetchQueries(["post", id]);
  }, [queryClient, id]);

  // Fetching in Position and Companies
  const companyAndRoleQuery = useQuery({
    queryKey: ["company-role-list"],
    queryFn: () => getCompanyAndRoleList(),
  });

  // prettier-ignore
  const { mutate,isLoading } = useMutation({
    mutationFn: (postData) => editPost(postData, id, 'published'),
    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(['post', id]);
      toast.success(data.message);
      navigate(`/post/${id}`);
    },
  });

  const initialValues = {
    jobTitle: postQuery.data?.title || "",
    companyOverview: postQuery.data?.company || "", // Assuming company as overview for simplicity
    jobDescription: postQuery.data?.content || "", // Assuming content as job description
    skillsRequired: postQuery.data?.tags
      ? getStringFromTags(postQuery.data?.tags)
      : "", // Assuming tags are skills
    eligibilityCriteria: postQuery.data?.summary || "", // Assuming summary as eligibility criteria
    salary: postQuery.data?.rating ? postQuery.data?.rating.toString() : "", // Assuming rating as salary (this may need adjustment based on actual logic)
    jobLocation: postQuery.data?.domain || "", // Assuming domain as location (this may need refinement)
    jobType: postQuery.data?.postType || "", // Assuming postType as jobType
    workMode: "", // No direct equivalent, you might need to set this based on your data
    selectionProcess: "", // No direct equivalent
    applicationProcess: "", // No direct equivalent
    applicationDeadline: "", // No direct equivalent
    pointOfContact: "", // No direct equivalent
  };

  return (
    <div className={styles.PostForm}>
      <div className={styles.container}>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={Yup.object({
            jobTitle: Yup.string()
              .max(200, "Job Title must be less than 200 characters")
              .required("Job Title is required"),
            companyOverview: Yup.string().required(
              "Company Overview is required"
            ),
            jobDescription: Yup.string().required(
              "Job Description is required"
            ),
            skillsRequired: Yup.string().required(
              "Skills Required is required"
            ),
            eligibilityCriteria: Yup.string().required(
              "Eligibility Criteria is required"
            ),
            salary: Yup.number().required("Salary is required"),
            jobLocation: Yup.string().required("Job Location is required"),
            jobType: Yup.string().required("Job Type is required"),
            workMode: Yup.string().required("Work Mode is required"), // If applicable
            selectionProcess: Yup.string().required(
              "Selection Process is required"
            ), // If applicable
            applicationProcess: Yup.string().required(
              "Application Process is required"
            ), // If applicable
            applicationDeadline: Yup.string().required(
              "Application Deadline is required"
            ), // If applicable
            pointOfContact: Yup.string().required(
              "Point of Contact is required"
            ), // If applicable
          })}
          onSubmit={(values) => mutate(values)}
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              className={styles.form}
              action=""
            >
              <header className={styles.title}>Write your post</header>

              <div
                className={`${styles.inputField} ${
                  formik.touched.jobTitle && formik.errors.jobTitle
                    ? styles.inputFieldError
                    : ""
                }`}
              >
                <label htmlFor="jobTitle">
                  Job Title
                  <span className="required">*</span>
                  <input
                    type="text"
                    name="jobTitle"
                    placeholder="Software Engineer"
                    value={formik.values.jobTitle}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </label>
              </div>

              <div
                className={`${styles.inputField} ${
                  formik.touched.companyOverview &&
                  formik.errors.companyOverview
                    ? styles.inputFieldError
                    : ""
                }`}
              >
                <label htmlFor="companyOverview">
                  Company Overview
                  <span className="required">*</span>
                  <textarea
                    name="companyOverview"
                    placeholder="Brief description of XYZ Tech"
                    value={formik.values.companyOverview}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </label>
              </div>

              <div
                className={`${styles.inputField} ${
                  formik.touched.jobDescription && formik.errors.jobDescription
                    ? styles.inputFieldError
                    : ""
                }`}
              >
                <label htmlFor="jobDescription">
                  Job Description
                  <span className="required">*</span>
                  <textarea
                    name="jobDescription"
                    placeholder="Responsibilities and duties"
                    value={formik.values.jobDescription}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </label>
              </div>

              <div
                className={`${styles.inputField} ${
                  formik.touched.skillsRequired && formik.errors.skillsRequired
                    ? styles.inputFieldError
                    : ""
                }`}
              >
                <label htmlFor="skillsRequired">
                  Skills Required
                  <span className="required">*</span>
                  <input
                    type="text"
                    name="skillsRequired"
                    placeholder="Java, JavaScript, SQL, Problem-solving"
                    value={formik.values.skillsRequired}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </label>
              </div>

              <div
                className={`${styles.inputField} ${
                  formik.touched.eligibilityCriteria &&
                  formik.errors.eligibilityCriteria
                    ? styles.inputFieldError
                    : ""
                }`}
              >
                <label htmlFor="eligibilityCriteria">
                  Eligibility Criteria
                  <span className="required">*</span>
                  <input
                    type="text"
                    name="eligibilityCriteria"
                    placeholder="BTech in CSE, 70% and above"
                    value={formik.values.eligibilityCriteria}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </label>
              </div>

              <div
                className={`${styles.inputField} ${
                  formik.touched.salary && formik.errors.salary
                    ? styles.inputFieldError
                    : ""
                }`}
              >
                <label htmlFor="salary">
                  Salary/Compensation
                  <span className="required">*</span>
                  <input
                    type="text"
                    name="salary"
                    placeholder="₹6,00,000 per annum"
                    value={formik.values.salary}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </label>
              </div>

              <div
                className={`${styles.inputField} ${
                  formik.touched.jobLocation && formik.errors.jobLocation
                    ? styles.inputFieldError
                    : ""
                }`}
              >
                <label htmlFor="jobLocation">
                  Job Location
                  <span className="required">*</span>
                  <input
                    type="text"
                    name="jobLocation"
                    placeholder="Bengaluru, India"
                    value={formik.values.jobLocation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </label>
              </div>

              <div
                className={`${styles.inputField} ${
                  formik.touched.jobType && formik.errors.jobType
                    ? styles.inputFieldError
                    : ""
                }`}
              >
                <label htmlFor="jobType">
                  Job Type
                  <span className="required">*</span>
                  <select
                    name="jobType"
                    value={formik.values.jobType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select job type</option>
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>

              <div
                className={`${styles.inputField} ${
                  formik.touched.workMode && formik.errors.workMode
                    ? styles.inputFieldError
                    : ""
                }`}
              >
                <label htmlFor="workMode">
                  Work Mode
                  <span className="required">*</span>
                  <select
                    name="workMode"
                    value={formik.values.workMode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select mode</option>
                    <option value="on-site">On-site</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </label>
              </div>

              <div
                className={`${styles.inputField} ${
                  formik.touched.selectionProcess &&
                  formik.errors.selectionProcess
                    ? styles.inputFieldError
                    : ""
                }`}
              >
                <label htmlFor="selectionProcess">
                  Selection Process
                  <span className="required">*</span>
                  <textarea
                    name="selectionProcess"
                    placeholder="Written test, technical interview, HR interview"
                    value={formik.values.selectionProcess}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </label>
              </div>

              <div
                className={`${styles.inputField} ${
                  formik.touched.applicationProcess &&
                  formik.errors.applicationProcess
                    ? styles.inputFieldError
                    : ""
                }`}
              >
                <label htmlFor="applicationProcess">
                  Application Process
                  <span className="required">*</span>
                  <input
                    type="text"
                    name="applicationProcess"
                    placeholder="Apply via institute portal"
                    value={formik.values.applicationProcess}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </label>
              </div>

              <div
                className={`${styles.inputField} ${
                  formik.touched.applicationDeadline &&
                  formik.errors.applicationDeadline
                    ? styles.inputFieldError
                    : ""
                }`}
              >
                <label htmlFor="applicationDeadline">
                  Application Deadline
                  <span className="required">*</span>
                  <input
                    type="date"
                    name="applicationDeadline"
                    value={formik.values.applicationDeadline}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </label>
              </div>

              <div
                className={`${styles.inputField} ${
                  formik.touched.pointOfContact && formik.errors.pointOfContact
                    ? styles.inputFieldError
                    : ""
                }`}
              >
                <label htmlFor="pointOfContact">
                  Point of Contact
                  <span className="required">*</span>
                  <input
                    type="text"
                    name="pointOfContact"
                    placeholder="John Doe - hr@xyztech.com"
                    value={formik.values.pointOfContact}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </label>
              </div>

              <div
                className={`${styles.inputField} ${
                  formik.touched.rating && formik.errors.rating
                    ? styles.inputFieldError
                    : ""
                }`}
              >
                Rate your Interview Experience
                <StarRating name="rating" />
              </div>

              <div className={styles.column}>
                <input
                  className={styles.registerButton}
                  type="submit"
                  value="Post"
                  disabled={isLoading}
                />
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
