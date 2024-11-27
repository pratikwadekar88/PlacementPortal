import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import QuizListPageImage from "../../assets/images/pages/home-page.png";
import Image from "../../components/Image/Image";
import LoginRequiredLink from "../../components/LoginRequiredLink/LoginRequiredLink";
import QuizQuestionForm from "../../components/QuizQuestionForm/QuizQuestionForm";
import { useAppSelector } from "../../redux/store";
import styles from "./QuizList.module.css";
import { getUserProfileStats } from "../../services/user.services";
import { useQuery } from "@tanstack/react-query";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

function QuizList() {
  const [cookieId, setCookieId] = useState('');

  const [companies, setCompanies] = useState([]);
  const isAdmin = useAppSelector((state) => state.userState.user?.isAdmin);

  const fetchCompanies = async () => {
    try {
      const response = await fetch('http://localhost:8080/company/allCompanies');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCompanies(data.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    const storedId = getCookie('userId');
    setCookieId(storedId);
  }, []);
  
  const profileQuery = useQuery({
    queryKey: ["profile", cookieId],
    queryFn: () => getUserProfileStats(cookieId),
  });
  
  const user = useAppSelector((state) => state.userState.user);

  const userData1 = profileQuery.data;

  const companiesApplied = userData1?.companies || [];

  const addCompany = (newCompany) => {
    setCompanies((prevCompanies) => [...prevCompanies, newCompany]);
  };

  return (
    <>
      <Helmet>
        <title>Companies | Interview Experience</title>
        <meta name="description" content="" />
        <meta name="twitter:card" content={QuizListPageImage} />
        <meta name="twitter:title" content="Companies | Interview Experience" />
        <meta name="twitter:description" content="" />
        <meta name="twitter:image" content={QuizListPageImage} />

        <meta property="og:title" content="Companies | Interview Experience" />
        <meta property="og:description" content="" />
        <meta property="og:image" content={QuizListPageImage} />
        <meta property="og:url" content={`${import.meta.env.VITE_BASE_CLIENT_URL}/quizzes`} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className={styles.QuizList}>
        <div className="container">
          {isAdmin && <QuizQuestionForm addCompany={addCompany} />}

          <div className={styles.quizTopics}>
            {companies.map((company) => (
              <div className={styles.quizTopic} key={company._id}>
                <Image
                  imageSrc={company.avatar}
                  imageAlt={company.name}
                  containerClassName=""
                  imageClassName={styles.quizImage}
                />

                <h2>{company.name}</h2>
                <p>{company.requirements}</p>

                {companiesApplied.includes(company._id) ? (
                  <button className={`default-button ${styles.appliedButton}`} disabled>
                    Applied
                  </button>
                ) : (
                  <LoginRequiredLink
                    textContent="Apply Now"
                    to={`/quiz/${company._id}`}
                    className={`default-button ${styles.startButton}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizList;
