import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import authenticIcon from "../../assets/images/home/facilities/authentic.png";
import communityIcon from "../../assets/images/home/facilities/community.png";
import doubtIcon from "../../assets/images/home/facilities/doubt.png";
import insightIcon from "../../assets/images/home/facilities/insight.png";


// Import Swiper styles
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import CompaniesListInfiniteHorizontalScroll from "../../components/CompaniesListInfiniteHorizontalScroll/CompaniesListInfiniteHorizontalScroll";
import GithubSection from "../../components/GithubSection/GithubSection";
import Image from "../../components/Image/Image";
import LoginRequiredLink from "../../components/LoginRequiredLink/LoginRequiredLink";
import TopPosts from "../../components/TopPosts/TopPosts";
import styles from "./Home.module.css";
import "./slider.css";

function Home() {
  return (
    <>
      <Helmet>
        <title>Campus Placement Platform</title>
      </Helmet>

      <div className={styles.Home}>
        <section className={styles.hero}>
          <div className="container">
            <h1 className={styles.title}>
              <span>A Friendly Tool to</span>
              <span className={styles.underlineSpan}>
                organise campus placements
              </span>
            </h1>
            <p>
              Board on the Campus Placement System at Institute name. Gain
              Real-Time insights into placement opportunities, interview
              processes, and employer interactions. Empower yourself with the
              right information to navigate your career journey with confidence
              and success! Make informed ecisions with Our Comprehensive and
              success! Make informed decisions with our comprehensive platform,
              designed to support students every step of the way in securing
              their dream jobs.
            </p>
            <div className={styles.heroActionButtons}>
              <Link
                to="/post"
                // onClick={handleCloseNavbar}
                className={`default-button ${styles.authButton}`}
              >
                Create Interview Experience
              </Link>
              <Link
                to="/posts"
                className={`default-button default-outline-button ${styles.aimButton}`}
              >
                View Interview Experiences
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.facilities} id="aim">
          <div className="container">
            <h2>
              <span>Be Prepared for your Next interview</span>
              <span className={styles.underlineSpan}>
                with Interview Experience
              </span>
            </h2>
            <div className={styles.facilitiesContainer}>
              <div className={styles.facility}>
                <img src={insightIcon} alt="" />
                <h3>Insights</h3>
                <p>
                  Get Real Insights, Ace Your Interviews. Discover the Power of
                  Sharing Your Experiences with Our Community.
                </p>
              </div>
              <div className={styles.facility}>
                <img src={doubtIcon} alt="" />
                <h3>Doubt Solving</h3>
                <p>
                  Get the Support You Need for Your Career Journey. Ask Your
                  Doubts, Get Feedback from Your Peers.
                </p>
              </div>
              <div className={styles.facility}>
                <img src={communityIcon} alt="" />
                <h3>Connect with Alumni</h3>
                <p>
                  Build Your Network, Grow Your Connections. Get to Know Alumni
                  and Expand Your Horizons.
                </p>
              </div>
              <div className={styles.facility}>
                <img src={authenticIcon} alt="" />
                <h3>Authenticity</h3>
                <p>
                  Discover Authentic Interview Insights on Our Platform and Get
                  a Realistic Look at Campus Placements!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.posts} id="recentPosts">
          <div className="container">
            <h2>
              <span className={styles.underlineSpan}>
                Top Interview Experiences
              </span>
            </h2>
            <TopPosts />
          </div>
        </section>

        <section className={styles.companies} id="recentPosts">
          <div className="container">
            <h2>Students Posted about</h2>
            {/* <CompaniesListInfiniteHorizontalScroll /> */}
          </div>
        </section>

        <section className={styles.team}>
          <div className="container">
            <div className={styles.teamContainer}>
              <h2>
                <span className={styles.underlineSpan}>Our Team</span>
              </h2>
              <div className={styles.memberContainer}>
                <div className={styles.member}>
                  <h3>
                    <a
                      href="https://www.linkedin.com/in/aman-pratap-singh-iitb/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Aman Pratap Singh
                    </a>
                  </h3>
                  <p>
                    Skilled Full Stack Developer proficient in React, Node, with
                    expertise in DSA problem-solving, and solved 700+ Problems
                    on Leetcode and 60+ Contests.
                  </p>
                </div>

                <div className={styles.member}>
                  <h3>
                    <a
                      href="https://www.linkedin.com/in/pratikwadekar/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Pratik Wadekar
                    </a>
                  </h3>
                  <p>
                    Experienced with MERN Stack, showcased coding skills on
                    Leetcode, Codechef, and Gfg. Past roles include MERN Stack
                    intern in various startups and currently working at BSF.
                  </p>
                </div>

                <div className={styles.member}>
                  <h3>
                    <a
                      href="https://www.linkedin.com/in/suyog-gatkal/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Suyog Gatkal
                    </a>
                  </h3>
                  <p>
                    MERN developer also well versed with ionic and react
                    framework.Full time Employee at ION. 3⭐ on CodeChef, 400+
                    Problems on Leetcode and always up for Problem Solving in
                    DSA.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Used to show the button for github */}
        <GithubSection />

        <section className={styles.attribution}>
          <div className="container">
            <div>
              <h2>
                <span className={styles.underlineSpan}>User Reviews</span>
              </h2>
              <div className={`attributionSlides ${styles.attributionSlides}`}>
                <Swiper
                  slidesPerView={1}
                  spaceBetween={30}
                  pagination={{
                    clickable: true,
                  }}
                  navigation
                  modules={[Pagination, Navigation]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <div className={styles.attributionSlide}>
                      <p className={styles.attributionText}>
                        In the future, this platform may be used by lower tier
                        institutes where there is no such platform available for
                        their students to prepare for their interviews as well
                        as to familiarize themselves with companies and their
                        processes.
                      </p>
                      <div className={styles.attributerDetail}>
                        <p className={styles.attributerName}>
                          Project Developers | Students
                        </p>
                        <p className={styles.attributerDesignation}>
                          CSE dept of IIT Bombay
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.footer}>
          <div className="container">
            <div className={styles.footerContainer}>
              <div className={styles.info}>
                <h2></h2>
                <p>
                  Empowering Students for Success: Join Our Community and Share
                  Your Interview Experiences.
                </p>
              </div>

              <div className={styles.links}>
                <h2>Links</h2>
                <Link to="/credits">Credits</Link>
                <a href="mailto:amanpratap.singh918@gmail.com">Contact Us</a>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.copyRight}>
          <div className="container">
            <p>
              &copy; 2024 Students of Computer Science Engineering Department,
              IIT Bombay. All Rights Reserved.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
