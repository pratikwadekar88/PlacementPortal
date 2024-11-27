import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";
import { getDrives } from "../../services/drives.service";
import styles from "./DrivesList.module.css";
import DrivePostCard from "../../components/DrivePostCard/DrivePostCard";
import PostForm from '../PostForm/PostForm';
function DrivesList() {
  const [drivesData, setDrivesData] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);
  // Fetch drives data

  const role = localStorage.getItem('role');
  useEffect(() => {
    const fetchDrivesData = async () => {
      try {
        const data = await getDrives(); // Fetch data from the API
        setDrivesData(data); // Set the fetched data to drivesData state
      } catch (error) {
        console.error("Error fetching drives data:", error);
      }
    };

    fetchDrivesData(); // Call the function to fetch data on component mount
  }, []);

  // Callback to update a specific drive post after it's updated in DrivePostCard
  const handleDrivePostUpdate = (updatedDrivePost) => {
    // Update the state with the new data
    setDrivesData((prevData) =>
      prevData.map((drive) =>
        drive.id === updatedDrivePost.id ? updatedDrivePost : drive
      )
    );
  };

  // Callback to delete a drive post
  const handleDrivePostDelete = (deletedDrivePostId) => {
    // Remove the deleted post from the state
    setDrivesData((prevData) =>
      prevData.filter((drive) => drive.id !== deletedDrivePostId)
    );
  };
  const togglePostForm = () => {
    setShowPostForm(!showPostForm);
  };
  return (
    <>
      <Helmet>
        <title>Active Drives</title>
      </Helmet>

      <div className={styles.PostList}>
        <section className={styles.posts} id="recentPosts">
          <div className="container">
            <h2>
              {/* <span>List of Companies</span> */}
            </h2>
            {role === "ADMIN" && (
              <div className="text-end mb-3">
                <Button variant="primary" onClick={togglePostForm}>
                  {showPostForm ? "Close Form" : "Add New Drive"}
                </Button>
              </div>
            )}

            {/* Conditionally render PostForm */}
            {showPostForm && (
              <div className="mb-4">
                <PostForm
                  onFormSubmit={(newDrive) => {
                    // setDrivesData((prevData) => [newDrive, ...prevData]);
                    togglePostForm(); // Close the form after submission
                    console.log("Form");  
                  }}
                />
              </div>
            )}
            <div className={styles.postList}>
              {drivesData?.map((drive) => (
                <Col key={drive.id} md={12}>
                  <DrivePostCard
                    drivePostData={drive}
                    onDrivePostUpdate={handleDrivePostUpdate} // Pass the callback to DrivePostCard
                    onDrivePostDelete={handleDrivePostDelete} // Pass the delete callback
                  />
                </Col>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default DrivesList;
