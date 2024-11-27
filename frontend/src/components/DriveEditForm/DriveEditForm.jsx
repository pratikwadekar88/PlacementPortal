// DriveEditForm.js
import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom"; // useParams to get the drive post ID
import { getDriveById, updateDrivePost } from "../../services/driveService"; // Services for API calls

const DriveEditForm = () => {
  const { id } = useParams(); // Get the drive post ID from URL
  const navigate = useNavigate(); // Hook to navigate to another page

  const [drivePost, setDrivePost] = useState({
    job_title: "",
    job_description: "",
    company_overview: "",
    eligibility_criteria: "",
    skills_required: "",
    selection_process: "",
    work_mode: "",
    job_location: "",
    salary: "",
    application_deadline: "",
  });

  // Fetch the drive post data when the component mounts
  useEffect(() => {
    const fetchDrivePostData = async () => {
      const data = await getDriveById(id); // Fetch the data from the API
      setDrivePost(data);
    };
    fetchDrivePostData();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDrivePost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDrivePost(id, drivePost); // Update the drive post through API
    navigate(`/drive-details/${id}`); // Navigate back to the drive details page
  };

  return (
    <div>
      <h2>Edit Drive Post</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="job_title">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                name="job_title"
                value={drivePost.job_title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="job_description">
              <Form.Label>Job Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="job_description"
                value={drivePost.job_description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="company_overview">
              <Form.Label>Company Overview</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="company_overview"
                value={drivePost.company_overview}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="eligibility_criteria">
              <Form.Label>Eligibility Criteria</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="eligibility_criteria"
                value={drivePost.eligibility_criteria}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="skills_required">
              <Form.Label>Skills Required</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="skills_required"
                value={drivePost.skills_required}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="selection_process">
              <Form.Label>Selection Process</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="selection_process"
                value={drivePost.selection_process}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="work_mode">
              <Form.Label>Work Mode</Form.Label>
              <Form.Control
                type="text"
                name="work_mode"
                value={drivePost.work_mode}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="job_location">
              <Form.Label>Job Location</Form.Label>
              <Form.Control
                type="text"
                name="job_location"
                value={drivePost.job_location}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="salary">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="text"
                name="salary"
                value={drivePost.salary}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="application_deadline">
              <Form.Label>Application Deadline</Form.Label>
              <Form.Control
                type="date"
                name="application_deadline"
                value={drivePost.application_deadline}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit">Save Changes</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default DriveEditForm;
