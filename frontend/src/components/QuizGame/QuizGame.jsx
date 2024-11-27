// import React, { useEffect,useState } from "react";
// import { useDispatch } from "react-redux";
// import Error from "../../pages/Error/Error";
// import Loading from "../../pages/Loading/Loading";
// import styles from "./QuizGame.module.css";

// import { getUserProfileStats } from "../../services/user.services";
// import { useQuery } from "@tanstack/react-query";

// import { useAppSelector } from "../../redux/store";
// import { useParams } from "react-router-dom";
// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
//   return null;
// }


// function QuizGame() {
//   const {  } = useParams();
  
  // const [cookieId, setCookieId] = useState('');

  // useEffect(() => {
  //   const storedId = getCookie('userId');
  //   setCookieId(storedId);
  // }, []);
  
  // console.log(cookieId);

  // const profileQuery = useQuery({
  //   queryKey: ["profile", cookieId],
  //   queryFn: () => getUserProfileStats(cookieId),
  // });
  
  // const user = useAppSelector((state) => state.userState.user);
  // const isEditable = user && cookieId === user?.userId;
  
  // const userData = profileQuery.data;

  // const { username, email, branch, passingYear, collegeId, about, github, leetcode, linkedin, prn } = userData || {};

//   console.log(userData);

//   console.log(username);
//   return (
//     <>
     
//        <div className="form-container">
//             <h1>User Information</h1>
//             <form>
//                 <label>
//                     username:
//                     <input type="text" value={username} readOnly />
//                 </label>
//           <br />
//           <label>
//                     Company Name:
//                     <input type="text" value={} readOnly />
//                 </label>
//                 <label>
//                     Email:
//                     <input type="email" value={email} readOnly />
//                 </label>
//                 <br />
//                 <label>
//                     Branch:
//                     <input type="text" value={branch} readOnly />
//                 </label>
//                 <br />
//                 <label>
//                     Passing Year:
//                     <input type="text" value={passingYear} readOnly />
//                 </label>
//           <br />
//           <label>
//                     CollegeID:
//                     <input type="text" value={collegeId} readOnly />
//                 </label>
//                 <br /> <label>
//                     PRN No:
//                     <input type="text" value={prn} readOnly />
//                 </label>
//                 <br />
    
//                 <label>
//                     About:
//                     <textarea value={about} readOnly />
//                 </label>
//                 <br />
//                 <label>
//                     Github:
//                     <input type="text" value={github || 'Not provided'} readOnly />
//                 </label>
//                 <br />
//                 <label>
//                     LeetCode:
//                     <input type="text" value={leetcode || 'Not provided'} readOnly />
//                 </label>
//                 <br />
//                 <label>
//                     LinkedIn:
//                     <input type="text" value={linkedin || 'Not provided'} readOnly />
//                 </label>
//                 <br />
//             </form>
//         </div>
//     </>
//   );
// }

// export default QuizGame;





import React, { useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { getUserProfileStats } from "../../services/user.services";

import { updateUser } from "../../services/user.services";
// import { UserUpdate } from "../../types/user.types";
import styles from "./QuizGame.module.css";
import { useAppSelector } from "../../redux/store";
// import { branches } from "../../assets/data/user.data";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

function QuizGame() {
  const { id } = useParams(); // Get the company ID from the URL
  const [cookieId, setCookieId] = useState('');

  // console.log("ID==");
  // console.log(id);

  useEffect(() => {
    const storedId = getCookie('userId');
    setCookieId(storedId);
  }, []);
  
  // console.log(cookieId);

  const profileQuery = useQuery({
    queryKey: ["profile", cookieId],
    queryFn: () => getUserProfileStats(cookieId),
  });
  
  const user = useAppSelector((state) => state.userState.user);
  const isEditable = user && cookieId === user?.userId;
  
  const userData1 = profileQuery.data;

  const { username, email, branch, passingYear, collegeId, about, github, leetcode, linkedin, prn,companies } = userData1 || {};


  const navigate = useNavigate();

  const userData = useAppSelector((state) => state.userState.user);

  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.refetchQueries(["user-status"]);
  }, [queryClient]);


  const { mutate, isLoading } = useMutation({
    mutationFn: (user) => {
      // Append the  to the companies array
      const updatedUser = { ...user, companies: [...user.companies, id] };
      // Call the updateUser function with the updated user object
      return updateUser(updatedUser);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate(`/profile/${userData?.userId}`);
    },
  });
  
  

  const initialValues = {
    username: userData?.username || "",
    designation: userData?.designation || "",
    branch: userData?.branch || "",
    about: userData?.about || "",
    passingYear: userData?.passingYear || new Date().getFullYear(),
    github: userData?.github || "",
    linkedin: userData?.linkedin || "",
    leetcode: userData?.leetcode || "",
    collegeId: userData?.collegeId || "",
    prn: userData?.prn || "",
    companies: userData?.companies || [],
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      username: Yup.string()
        .max(20, "User Name must be 20 characters of less")
        .required("Username is required"),
      // designation: Yup.string().required("Designation is required"),
      // branch: Yup.string().required("Branch is required"),
      // passingYear: Yup.number().required("Passing Year is required"),
      // about: Yup.string().required("About is required"),
      // github: Yup.string().url("Invalid github url"),
      // linkedin: Yup.string().url("Invalid linkedin url"),
      // leetcode: Yup.string().url("Invalid leetcode url"),
      // collegeId: Yup.string().required("College ID is required"),
      // prn: Yup.string().required("PRN is required"),

    }),
    onSubmit: (values) => mutate(values),
  });

  // console.log(userData1);
  
  return (
    <div className={styles.ProfileEdit}>
      <div className={styles.container}>
        <header className={styles.title}>Student Profile</header>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <div
            className={`${styles.inputField} ${
              formik.touched.username && formik.errors.username
                ? styles.inputFieldError
                : ""
            }`}
          >
            <label htmlFor="username">
              {formik.touched.username && formik.errors.username
                ? formik.errors.username
                : "Name"}
              
              <input
                type="text"
                name="username"
                placeholder="username"
                value={username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                readOnly
              />
            </label>
          </div>

          <div
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
              
              <input
                type="text"
                name="collegeId"
                placeholder="C2K2"
                value={collegeId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                readOnly
              />
            </label>
          </div>

          <div
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
              
              <input
                type="text"
                name="prn"
                placeholder="PRN NO"
                value={prn}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                readOnly
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
              
              <input
                type="text"
                name="branch"
                value={branch}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                readOnly
              />
            </label>
          </div>

  

        

          <div
            className={`${styles.inputField} ${
              formik.touched.passingYear && formik.errors.passingYear
                ? styles.inputFieldError
                : ""
            }`}
          >
            <label htmlFor="passingYear">
              {formik.touched.passingYear && formik.errors.passingYear
                ? formik.errors.passingYear
                : "Passing Year"}
              
              <input
                type="number"
                name="passingYear"
                placeholder="2024"
                value={passingYear}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                readOnly
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
              
              <textarea
                name="about"
                id="about"
                placeholder="Introduce yourself..."
                value={about}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                readOnly
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
                value={github ? github : ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                readOnly
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
                value={linkedin ? linkedin : ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                readOnly
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
                value={leetcode ? leetcode : ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                readOnly
              />
            </label>
          </div>

          <input
            type="submit"
            value={`Apply Now`}
            className={styles.updateButton}
            disabled={isLoading}
          />
        </form>
      </div>
    </div>
  );
}

export default QuizGame;