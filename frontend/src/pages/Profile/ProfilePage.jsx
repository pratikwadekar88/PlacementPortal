import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { AiFillFire } from "react-icons/ai";
import { DiGithubBadge } from "react-icons/di";
import { FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { Link, useParams } from "react-router-dom";
import profilePageImage from "../../assets/images/pages/profile-page.png";
import ProfileTab from "../../components/ProfileTab/ProfileTab";
import { useAppSelector } from "../../redux/store";
import { getStreak } from "../../services/quiz.services";
import { getUserProfileStats } from "../../services/user.services";
import styles from "./ProfilePage.module.css";
import { useUser } from "../../context/UserContext";

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/`;
}

function ProfilePage() {
  const { id } = useParams();
  const getUserProfileData = async (userId) => {
    const url = `${BACKEND_API_URL}/user/profile/${userId}/`;

    // Retrieve the token (replace this with your storage method)
    const token = localStorage.getItem("accessToken");

    return await axios
      .get(url, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json", // Optional, in case you need to set the content type
          Authorization: `Bearer ${authToken}`, // Include Bearer token in the Authorization header
          Accept: "application/json"
        }
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching user profile stats:", error);
        throw error; // Re-throw the error for further handling
      });
  };
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getUserProfileData(id); // Get post data using getPost
        console.log(postData);
        setPost(postData);
      } catch (err) {}
    };

    fetchPost();
  }, []);

  // const profileQuery = useQuery({
  //   queryKey: ["profile", id],
  //   queryFn: () => getUserProfileStats(id)
  // });

  // const streakQuery = useQuery({
  //   queryKey: ["streak", id],
  //   queryFn: () => getStreak(id),
  // });

  //sending data
  const [userData, setUserData] = useState(null);
  // const history = useHistory();

  // Used to check if the profile belongs to the user
  const { user, role } = useUser();
  const isEditable = user && id === user?.userId;
  console.log("user", user);

  // TODO: Add good loading and error elements
  // if (profileQuery.isLoading) {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         height: "100vh",
  //         justifyContent: "center",
  //         alignItems: "center"
  //       }}
  //     >
  //       {" "}
  //     </div>
  //   );
  // }

  // if (profileQuery.isError) {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         height: "100vh",
  //         justifyContent: "center",
  //         alignItems: "center"
  //       }}
  //     >
  //       <h1>Error</h1>
  //     </div>
  //   );
  // }

  // Extracting query data
  // const profileData = profileQuery?.data;
  // const profilePostStats = profileData?.postData[0];

  // setUserData(profileData)
  // history.push('/quizzes', { userData });

  return (
    <>
      <Helmet>
        <title>{`${user?.first_name}'s Profile`}</title>
      </Helmet>

      <div className={styles.ProfilePage}>
        <div className={styles.container}>
          <div className={styles.profileContainer}>
            <p className={`${styles.info} ${styles.fullname}`}>
              {user?.first_name}
            </p>
            <p >
             <b>Email</b>  : {user?.email}
            </p>
            {/* <p className={`${styles.info} ${styles.role}`}>
              PRN : {profileData.prn}
            </p> */}
            <p >
             <b>Designation</b>  : {user?.designation}
            </p>
            {/* <p >
            <b>Branch name</b>:{user?.branch_name}
            </p> */}
            <p >
             
            <b>Passing year</b>  :{' '}{user?.passing_year}
            </p>
            {/* <div className={styles.postsInfo}>
              <p>
                <span>{profilePostStats.postCount}</span>
                Posts
              </p>
              <p>
                <span>{profilePostStats.viewCount}</span>
                Views
              </p>
              <p>
                <span>{votes}</span>
                Likes
              </p>
            </div> */}

            {/* {!streakQuery.isLoading ? (
              <p
                className={`${styles.streak} ${
                  streakQuery.data?.dailyQuizDone ? styles.streakActive : ""
                }`}
              >
                {streakQuery.data?.streakCount}
                <AiFillFire className={styles.fire} />
              </p>
            ) : null} */}

            <p ><b>Summary</b>:{' '}{user?.about}</p>

            <div className={styles.socialContainer}>
              {user?.linkedin ? (
                <a
                  href={user?.linkedin}
                  className={styles.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin />
                </a>
              ) : null}

              {user?.github ? (
                <a
                  href={user?.github}
                  className={styles.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <DiGithubBadge />
                </a>
              ) : null}

              {user?.leetcode ? (
                <a
                  href={user?.leetcode}
                  className={styles.leetcode}
                  target="_blank"
                  rel="noreferrer"
                >
                  <SiLeetcode />
                </a>
              ) : null}
            </div>

            {/* {isEditable ? ( */}
              <Link
                to="/profile/edit"
                className={`default-button ${styles.editButton}`}
              >
                Edit Profile
              </Link>
            {/* ) : null} */}
          </div>

          <ProfileTab />
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
