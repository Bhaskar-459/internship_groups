import { useState } from 'react';
import { Container, Button, Col, Form, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FormComp.css';

function FormComp() {
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [Sclass, setSClass] = useState('');
  const [internship, setInternship] = useState('');
  const [year, setYear] = useState('');

  const postStudentData = async () => {
    const response = await fetch('http://localhost:5000/post/student', {
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
            <option value="Internship1">Internship 1</option>
            <option value="Internship2">Internship 2</option>
            <option value="Internship3">Internship 3</option>
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
