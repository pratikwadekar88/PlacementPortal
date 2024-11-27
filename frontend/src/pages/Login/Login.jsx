import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiEnvelope, BiLockAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useUser } from "../../context/UserContext";

import loginPageImage from "../../assets/images/pages/login.png";
import ForgetPasswordModal from "../../components/ForgetPasswordModal/ForgetPasswordModal";
import SignInWithGoogle from "../../components/SignInWithGoogle/SignInWithGoogle";
import { loginUser } from "../../services/user.services";
import styles from "./Login.module.css";
import { jwtDecode } from "jwt-decode";

function Login() {
  // const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { setUserData } = useUser();

  const [showPassword, setShowPassword] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { mutate, isLoading } = useMutation({
    mutationFn: (user) => loginUser(user.email, user.password),
    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      console.log(data);

      // Assuming the response contains access and refresh tokens
      const {
        "access-token": accessToken,
        "refresh-token": refreshToken,
        user: userData,
      } = data;
      // console.log(accessToken);
      // console.log(refreshToken);
      // console.log(userData);
      const decoded = jwtDecode(accessToken);
      const { permissions } = decoded;
      const role = permissions[0];
      localStorage.setItem("role", role);

      // Store tokens in localStorage (you can also use sessionStorage)
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("status", true);
      setUserData(userData);
      navigate("/");
    },
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email is Required"),
      password: Yup.string()
        .max(20, "Password must be less than 20 characters")
        .required("Password is Required"),
    }),
    onSubmit: (values) => mutate(values),
  });

  return (
    <>
      <Helmet>
        <title>User Login</title>
      </Helmet>

      <div className={styles.Login}>
        <div className={styles.container}>
          <div className={`${styles.form} ${styles.login}`}>
            <span className={styles.title}>Login</span>
            <form onSubmit={formik.handleSubmit}>
              <div
                className={`${styles.inputField} ${
                  formik.touched.email && formik.errors.email
                    ? styles.inputFieldError
                    : ""
                }`}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <BiEnvelope className={styles.icon} />
              </div>
              <div
                className={`${styles.inputField} ${
                  formik.touched.password && formik.errors.password
                    ? styles.inputFieldError
                    : ""
                }`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  className={styles.password}
                  placeholder="Enter your password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <BiLockAlt className={styles.icon} />
                {showPassword ? (
                  <AiOutlineEye
                    className={`${styles.icon} ${styles.eyeIcon}`}
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className={`${styles.icon} ${styles.eyeIcon}`}
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
              <div className={styles.checkboxText}>
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(true);
                  }}
                  className={styles.forgotPassword}
                >
                  Forgot password?
                </button>
              </div>
              <div className={`${styles.inputField} ${styles.button}`}>
                <input type="submit" value="Login" disabled={isLoading} />
              </div>
            </form>
            {modalOpen && (
              <ForgetPasswordModal
                closeModalCallback={() => setModalOpen(false)}
              />
            )}

            <div className={styles.orLabel}>OR</div>

            <div>
              <SignInWithGoogle />
            </div>

            <div className={styles.loginSignUp}>
              <span className={styles.signUpText}>
                Not a member?
                <Link to="/register">SignUp Now</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
