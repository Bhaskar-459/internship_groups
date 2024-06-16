import React, { useState } from 'react';
import { Container, Button, Col, Form, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FormComp.css';
const base_url = import.meta.env.VITE_REACT_APP_API_BASE_URL;

function FormComp() {
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [Sclass, setSClass] = useState('');
  const [internship, setInternship] = useState('');
  const [year, setYear] = useState('');

  const internshipOptions = [
    'AWS Data Analytics VIRTUAL INTERNSHIP PROGRAM',
    'AWS cloud Virtual internship',
    'AWS AI &ML Virtual internship',
    'LINUX AUTOMATION VIRTUAL INTERNSHIP PROGRAM',
    'BluePrism ROBOTIC PROCESS AUTOMATION',
    'Juniper Networking Cloud Virtual Internship',
    'Alteryx Data Analytics Process Automation Virtual Internship',
    'Juniper Networking Virtual Internship',
    'Celonis Process Mining Virtual Internship',
    'Embedded system developer Virtuval Internship',
    'Network security virtual Internship (Fortinet)',
    'CYBERSECURITY VIRTUAL INTERNSHIP PROGRAM',
    'ROBOTIC PROCESS AUTOMATION (Ulpath) VIRTUAL INTERNSHIP',
    'ANDROID DEVELOPER VIRTUAL INTERNSHIP',
    'ZERO TRUST CLOUD SECURITY VIRTUAL INTERNSHIP',
    'Altair Conceptual Cae Design And Simulation Virtual Internship',
    'Altair Data Science Master Virtual Internship',
    'Aws Data Engineering Virtual Internship',
    'Bentley Water Resource Management Virtual Internship',
    'Bentley Structural Analysis With Staad. Pro Virtual Internship',
    'Celonis Business Analyst Virtual Internship',
    'Google Ai-MI Virtual Internship'
  ];

  const postStudentData = async () => {
    console.log("base",base_url)
    const response = await fetch(`${base_url}/post/student`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        rollNumber: rollNumber,
        Sclass: Sclass,
        internship: internship,
        Year : year
      }),
    });
    const data = await response.json();
    localStorage.setItem('user_id', data._id);
    localStorage.setItem('user_data', JSON.stringify(data));
    window.location.reload();  // Reload the page to recheck the login state
  }

  const handleSubmit = (event) => {
    event.preventDefault();  // Prevent default form submission

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      postStudentData();
    }

    setValidated(true);
  };

  return (
    <Container className="form-container">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Col} md="2" controlId="validationCustom01">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" controlId="validationCustom02">
          <Form.Label>Class</Form.Label>
          <Form.Control
            as="select"
            required
            value={Sclass}
            onChange={(e) => setSClass(e.target.value)}
          >
            <option value="">Select Class</option>
            <option value="CSE-1">CSE-1</option>
            <option value="CSE-2">CSE-2</option>
            <option value="CSE-3">CSE-3</option>
            <option value="CSE-4">CSE-4</option>
            <option value="CSD">CSD</option>
            <option value="CSM">CSM</option>
          </Form.Control>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" controlId="validationCustom03">
          <Form.Label>Roll Number</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="Roll Number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please Fill your Roll Number.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="2" controlId="validationCustom04">
          <Form.Label>Internship</Form.Label>
          <Form.Control 
            as="select" 
            required 
            value={internship}
            onChange={(e) => setInternship(e.target.value)}
          >
            <option value="">Select Internship</option>
            {internshipOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please Select an Internship.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="2" controlId="validationCustom05">
          <Form.Label>Year</Form.Label>
          <Form.Control 
            as="select" 
            required 
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">Select Year</option>
            <option value="3rd">3rd Year</option>
            <option value="4th">4th Year</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please Select an Year.
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">Submit form</Button>
      </Form>
    </Container>
  );
}

export default FormComp;
