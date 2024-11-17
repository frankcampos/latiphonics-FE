/* eslint-disable import/no-extraneous-dependencies */
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
  Form, Button, Container, Row, Col,
} from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import updateUser from '../../api/user';

export default function EditUser() {
  const router = useRouter();
  const userObject = router.query;
  const [userForm, setUserForm] = useState(userObject);

  const handleGoBack = () => {
    router.back();
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    updateUser(userForm);
    router.back();
  };

  useEffect(() => {
    const handleRouteChange = () => {
      router.reload();
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container className="my-5" style={{ fontFamily: 'Arial, sans-serif' }}>
      <h1 className="text-center my-4">Edit Profile</h1>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formGroupFirstName">
          <Form.Label column sm={2} className="fw-bold">First Name</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              value={userForm.first_name || ''}
              name="first_name"
              placeholder="Add your first name"
              onChange={handleOnChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formGroupLastName">
          <Form.Label className="fw-bold" column sm={2}>Last Name</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              value={userForm.last_name || ''}
              name="last_name"
              placeholder="Add your last name"
              onChange={handleOnChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formGroupPhoto">
          <Form.Label column sm={2} className="fw-bold">Photo URL</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              value={userForm.photo || ''}
              name="photo"
              placeholder="Add your photo URL"
              onChange={handleOnChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formGroupAbout">
          <Form.Label column sm={2} className="fw-bold">About Me</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={15}
              value={userForm.about || ''}
              name="about"
              placeholder="Tell us about yourself"
              onChange={handleOnChange}
            />
          </Col>
        </Form.Group>
        <div className="text-center">
          <Button variant="dark" type="submit" className="me-2">Submit</Button>
          <Button variant="outline-primary" onClick={handleGoBack}>
            <FaArrowLeft /> Go Back
          </Button>
        </div>
      </Form>
    </Container>
  );
}
