import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Formik } from "formik";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  createDrive,
  // getCompanyAndRoleList,
} from "../../services/drives.service";
import styles from "./PostForm.module.css";

function PostForm() {
  const navigate = useNavigate();

  // Fetching in Position and Companies
  // const companyAndRoleQuery = useQuery({
  //   queryKey: ["company-role-list"],
  //   queryFn: () => getCompanyAndRoleList(),
  // });

  // prettier-ignore
  const { mutate, isLoading } = useMutation({
    mutationFn: (postData) => createDrive(postData),
    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate(`/driveslist`);
    },
  });

  const initialValues = {
    job_title: "",
    company_overview: "",
    job_description: "",
    skills_required: "",
    eligibility_criteria: "",
    salary: "",
    job_location: "",
    job_type: "",
    work_mode: "",
    selection_process: "",
    application_deadline: "",
  };

  return (
    <>
      <Helmet>
        <title>Create Drive Post</title>
      </Helmet>

      <div className={styles.PostForm}>
        <div className={styles.container}>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
              job_title: Yup.string().required("Job Title is required"),
              company_overview: Yup.string().required(
                "Company Overview is required"
              ),
              job_description: Yup.string().required(
                "Job Description is required"
              ),
              skills_required: Yup.string().required(
                "Skills Required is required"
              ),
              eligibility_criteria: Yup.string().required(
                "Eligibility Criteria is required"
              ),
              salary: Yup.string().required("Salary/Compensation is required"),
              job_location: Yup.string().required("Job Location is required"),
              job_type: Yup.string().required("Job Type is required"),
              work_mode: Yup.string().required("Work Mode is required"),
              selection_process: Yup.string().required(
                "Selection Process is required"
              ),
              // applicationProcess: Yup.string().required(
              //   "Application Process is required"
              // ),
              application_deadline: Yup.string().required(
                "Application Deadline is required"
              ),
              // pointOfContact: Yup.string().required(
              //   "Point of Contact is required"
              // ),
            })}
            onSubmit={(values) => mutate(values)}
          >
            {(formik) => (
              <form
                onSubmit={formik.handleSubmit}
                className={styles.form}
                action=""
              >
                <header className={styles.title}>Create Drive Post</header>

                <div
                  className={`${styles.inputField} ${
                    formik.touched.job_title && formik.errors.job_title
                      ? styles.inputFieldError
                      : ""
                  }`}
                >
                  <label htmlFor="job_title">
                    Job Title
                    <span className="required">*</span>
                    <input
                      type="text"
                      name="job_title"
                      placeholder="Software Engineer"
                      value={formik.values.job_title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </label>
                </div>

                <div
                  className={`${styles.inputField} ${
                    formik.touched.company_overview &&
                    formik.errors.company_overview
                      ? styles.inputFieldError
                      : ""
                  }`}
                >
                  <label htmlFor="company_overview">
                    Company Overview
                    <span className="required">*</span>
                    <textarea
                      name="company_overview"
                      placeholder="Brief description of XYZ Tech"
                      value={formik.values.company_overview}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </label>
                </div>

                <div
                  className={`${styles.inputField} ${
                    formik.touched.job_description &&
                    formik.errors.job_description
                      ? styles.inputFieldError
                      : ""
                  }`}
                >
                  <label htmlFor="job_description">
                    Job Description
                    <span className="required">*</span>
                    <textarea
                      name="job_description"
                      placeholder="Responsibilities and duties"
                      value={formik.values.job_description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </label>
                </div>

                <div
                  className={`${styles.inputField} ${
                    formik.touched.skills_required &&
                    formik.errors.skills_required
                      ? styles.inputFieldError
                      : ""
                  }`}
                >
                  <label htmlFor="skills_required">
                    Skills Required
                    <span className="required">*</span>
                    <input
                      type="text"
                      name="skills_required"
                      placeholder="Java, JavaScript, SQL, Problem-solving"
                      value={formik.values.skills_required}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </label>
                </div>

                <div
                  className={`${styles.inputField} ${
                    formik.touched.eligibility_criteria &&
                    formik.errors.eligibility_criteria
                      ? styles.inputFieldError
                      : ""
                  }`}
                >
                  <label htmlFor="eligibility_criteria">
                    Eligibility Criteria
                    <span className="required">*</span>
                    <input
                      type="text"
                      name="eligibility_criteria"
                      placeholder="BTech in CSE, 70% and above"
                      value={formik.values.eligibility_criteria}
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
                    formik.touched.job_location && formik.errors.job_location
                      ? styles.inputFieldError
                      : ""
                  }`}
                >
                  <label htmlFor="job_location">
                    Job Location
                    <span className="required">*</span>
                    <input
                      type="text"
                      name="job_location"
                      placeholder="Bengaluru, India"
                      value={formik.values.job_location}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </label>
                </div>

                <div
                  className={`${styles.inputField} ${
                    formik.touched.job_type && formik.errors.job_type
                      ? styles.inputFieldError
                      : ""
                  }`}
                >
                  <label htmlFor="job_type">
                    Job Type
                    <span className="required">*</span>
                    <select
                      name="job_type"
                      value={formik.values.job_type}
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
                    formik.touched.work_mode && formik.errors.work_mode
                      ? styles.inputFieldError
                      : ""
                  }`}
                >
                  <label htmlFor="work_mode">
                    Work Mode
                    <span className="required">*</span>
                    <select
                      name="work_mode"
                      value={formik.values.work_mode}
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
                    formik.touched.selection_process &&
                    formik.errors.selection_process
                      ? styles.inputFieldError
                      : ""
                  }`}
                >
                  <label htmlFor="selection_process">
                    Selection Process
                    <span className="required">*</span>
                    <textarea
                      name="selection_process"
                      placeholder="Written test, technical interview, HR interview"
                      value={formik.values.selection_process}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </label>
                </div>
{/* 
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
                </div> */}

                <div
                  className={`${styles.inputField} ${
                    formik.touched.application_deadline &&
                    formik.errors.application_deadline
                      ? styles.inputFieldError
                      : ""
                  }`}
                >
                  <label htmlFor="application_deadline">
                    Application Deadline
                    <span className="required">*</span>
                    <input
                      type="date"
                      name="application_deadline"
                      value={formik.values.application_deadline}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </label>
                </div>

                {/* <div
                  className={`${styles.inputField} ${
                    formik.touched.pointOfContact &&
                    formik.errors.pointOfContact
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
                </div> */}

                <div className={styles.column}>
                  <input
                    className={styles.registerButton}
                    type="submit"
                    value="Post Job"
                    disabled={isLoading}
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

export default PostForm;
