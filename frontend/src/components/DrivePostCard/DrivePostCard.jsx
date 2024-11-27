import React, { useState } from "react";
import { Card, Row, Col, Button, Form,Table,Alert } from "react-bootstrap";
import { useUser } from "../../context/UserContext"; // Custom hook to access user context
import {
  updateDrivePost,
  deleteDrivePost,
  applyOnDrivePost,
  getApplicantsTable
} from "../../services/drives.service"; // API calls to update and delete
import styles from "./DrivePostCard.module.css";
import * as XLSX from 'xlsx';

const DrivePostCard = ({
  drivePostData,
  onDrivePostUpdate,
  onDrivePostDelete,
}) => {
  // const { role } = useUser(); // Get the role of the current user from context
  const role = localStorage.getItem("role");

  // State to manage whether the post is being edited
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    job_title: drivePostData.job_title,
    job_description: drivePostData.job_description,
    company_overview: drivePostData.company_overview,
    eligibility_criteria: drivePostData.eligibility_criteria,
    skills_required: drivePostData.skills_required,
    selection_process: drivePostData.selection_process,
    work_mode: drivePostData.work_mode,
    job_type: drivePostData.job_type,
    job_location: drivePostData.job_location,
    salary: drivePostData.salary,
    application_deadline: drivePostData.application_deadline,
  });

  // Track application status (whether user has applied or not)
  const [hasApplied, setHasApplied] = useState(false);
  const [applicantsData, setApplicantsData] = useState([]);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [alert, setAlert] = useState({ show: false, variant: "", message: "" });
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle between edit and view modes
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Handle form submission to update the drive post
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the API to update the drive post
      const updatedPost = await updateDrivePost(drivePostData.id, formData);

      // Pass the updated post back to the parent component (DrivesList) via the callback
      onDrivePostUpdate(updatedPost);

      // Toggle back to view mode after submitting
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating the post:", error);
    }
  };

  // Handle post deletion
  const handleDelete = async () => {
    try {
      // Call the API to delete the drive post
      await deleteDrivePost(drivePostData.id);

      // Notify the parent component to remove the deleted post from the list
      onDrivePostDelete(drivePostData.id);
    } catch (error) {
      console.error("Error deleting the post:", error);
    }
  };


  const handleApplicants = async () => {
    
    if (isTableVisible) {
      // If the table is visible, hide it
      setIsTableVisible(false);
    } else {try {
      // Fetch the applicants data
      const data = await getApplicantsTable(drivePostData.id);
      setApplicantsData(data);

      // Make the table visible only after data is fetched
      setIsTableVisible(true);
    } catch (error) {
      console.error("Error fetching applicants data:", error);
    }
  }
  };

  // Handle applying for the drive post
  const handleApply = async () => {
    try {
      const response = await applyOnDrivePost(drivePostData.id);

      // If application is successful, update the state to reflect that the user has applied
      // Handle response statuses
      if (response.status === 201) {
        setAlert({
          show: true,
          variant: "success",
          message: "Application submitted successfully!",
        });
      } else if (response.status === 400) {
        setAlert({
          show: true,
          variant: "danger",
          message: "Bad request. Please check the inputs.",
        });
      }
    } catch (error) {
      // Handle specific errors
      if (error.response?.status === 409) {
        setAlert({
          show: true,
          variant: "warning",
          message: "You have already applied for this job.",
        });
      } else {
        setAlert({
          show: true,
          variant: "danger",
          message: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

  const handleExportToExcel = () => {
    // Create a worksheet from applicants data
    const ws = XLSX.utils.json_to_sheet(applicantsData);
    // Create a new workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Applicants");
    // Export the workbook to an Excel file
    XLSX.writeFile(wb, "applicants.xlsx");
  };

  return (
    <Card className="mb-4 w-100" style={{ width: "100%" }}>
      <Card.Header className={`text-white ${styles.cardTitle}`}>
        {/* Editable job title or plain text depending on edit mode */}
        {isEditing ? (
          <Form.Control
            type="text"
            name="job_title"
            value={formData.job_title}
            onChange={handleChange}
          />
        ) : (
          drivePostData.job_title
        )}
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            {/* Job Description */}
            <Card.Text>
              <Row>
                <Col md={3}>
                  <strong>Job Description:</strong>
                </Col>
                <Col md={9}>
                  {isEditing ? (
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="job_description"
                      value={formData.job_description}
                      onChange={handleChange}
                    />
                  ) : (
                    drivePostData.job_description
                  )}
                </Col>
              </Row>
            </Card.Text>

            {/* Company Overview */}
            <Card.Text>
              <Row>
                <Col md={3}>
                  <strong>Company Overview:</strong>
                </Col>
                <Col md={9}>
                  {isEditing ? (
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="company_overview"
                      value={formData.company_overview}
                      onChange={handleChange}
                    />
                  ) : (
                    drivePostData.company_overview
                  )}
                </Col>
              </Row>
            </Card.Text>

            {/* Eligibility Criteria */}
            <Card.Text>
              <Row>
                <Col md={3}>
                  <strong>Eligibility Criteria:</strong>
                </Col>
                <Col md={9}>
                  {isEditing ? (
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="eligibility_criteria"
                      value={formData.eligibility_criteria}
                      onChange={handleChange}
                    />
                  ) : (
                    drivePostData.eligibility_criteria
                  )}
                </Col>
              </Row>
            </Card.Text>

            {/* Skills Required */}
            <Card.Text>
              <Row>
                <Col md={3}>
                  <strong>Skills Required:</strong>
                </Col>
                <Col md={9}>
                  {isEditing ? (
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="skills_required"
                      value={formData.skills_required}
                      onChange={handleChange}
                    />
                  ) : (
                    drivePostData.skills_required
                  )}
                </Col>
              </Row>
            </Card.Text>

            {/* Selection Process */}
            <Card.Text>
              <Row>
                <Col md={3}>
                  <strong>Selection Process:</strong>
                </Col>
                <Col md={9}>
                  {isEditing ? (
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="selection_process"
                      value={formData.selection_process}
                      onChange={handleChange}
                    />
                  ) : (
                    drivePostData.selection_process
                  )}
                </Col>
              </Row>
            </Card.Text>

            {/* Work Mode */}
            <Card.Text>
              <Row>
                <Col md={3}>
                  <strong>Work Mode:</strong>
                </Col>
                <Col md={9}>
                  {isEditing ? (
                    <Form.Control
                      type="text"
                      name="work_mode"
                      value={formData.work_mode}
                      onChange={handleChange}
                    />
                  ) : (
                    drivePostData.work_mode
                  )}
                </Col>
              </Row>
            </Card.Text>

            {/* Job Type */}
            <Card.Text>
              <Row>
                <Col md={3}>
                  <strong>Job Type:</strong>
                </Col>
                <Col md={9}>
                  {isEditing ? (
                    <Form.Control
                      type="text"
                      name="job_type"
                      value={formData.job_type}
                      onChange={handleChange}
                    />
                  ) : (
                    drivePostData.job_type
                  )}
                </Col>
              </Row>
            </Card.Text>

            {/* Job Location */}
            <Card.Text>
              <Row>
                <Col md={3}>
                  <strong>Location:</strong>
                </Col>
                <Col md={9}>
                  {isEditing ? (
                    <Form.Control
                      type="text"
                      name="job_location"
                      value={formData.job_location}
                      onChange={handleChange}
                    />
                  ) : (
                    drivePostData.job_location
                  )}
                </Col>
              </Row>
            </Card.Text>

            {/* Salary */}
            <Card.Text>
              <Row>
                <Col md={3}>
                  <strong>Salary:</strong>
                </Col>
                <Col md={9}>
                  {isEditing ? (
                    <Form.Control
                      type="text"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                    />
                  ) : (
                    `$${drivePostData.salary}`
                  )}
                </Col>
              </Row>
            </Card.Text>

            {/* Application Deadline */}
            <Card.Text>
              <Row>
                <Col md={3}>
                  <strong>Application Deadline:</strong>
                </Col>
                <Col md={9}>
                  {isEditing ? (
                    <Form.Control
                      type="date"
                      name="application_deadline"
                      value={formData.application_deadline}
                      onChange={handleChange}
                    />
                  ) : (
                    drivePostData.application_deadline
                  )}
                </Col>
              </Row>
            </Card.Text>

            {/* Conditional rendering for admin */}
            {role === "ADMIN" ? (
              <>
                <Button
                  onClick={isEditing ? handleSubmit : toggleEdit}
                  className={`text-white ${styles.cardTitle}`}
                >
                  {isEditing ? "Submit" : "Edit"}
                </Button>
                <Button
                  onClick={handleDelete}
                  className={`text-white m-2`}
                  variant="danger"
                >
                  Delete
                </Button>

                <div>
                <Button
                  onClick={handleExportToExcel}
                  className="text-white m-2"
                  variant="success"
                >
                  Download Applicants (Excel)
                </Button>
      <Button
        onClick={handleApplicants}
        className="text-white m-2"
        variant="info"
      >
        {isTableVisible ? "Hide Applicants" : "Get Applicants"}
      </Button>

      {isTableVisible && applicantsData.length > 0 && (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              {Object.keys(applicantsData[0]).map((key) => (
                <th key={key}>{key.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {applicantsData.map((applicant, index) => (
              <tr key={index}>
                {Object.values(applicant).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {isTableVisible && applicantsData.length === 0 && (
        <p className="mt-3">No applicants found.</p>
      )}
    </div>

              </>
            ) : (
              <div>
                {/* Display alerts */}
                {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}

                {/* Button to apply for a job */}
                <button className="btn btn-primary" onClick={handleApply}>
                  Apply Now
                </button>
            </div>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DrivePostCard;
