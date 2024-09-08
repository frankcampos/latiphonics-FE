/* eslint-disable import/no-extraneous-dependencies */
import { useRouter } from 'next/router';
import {
  Form, Button, Container, Row, Col,
} from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';

export default function EditUser() {
  const router = useRouter();
  const userObject = router.query;

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Container className="my-5">
      <h1 className="text-center my-4">Edit Profile</h1>
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formGroupFirstName">
          <Form.Label column sm={2} className="fw-bold">First Name</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" defaultValue={userObject.first_name} name="first_name" placeholder="Add your first name" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formGroupLastName">
          <Form.Label className="fw-bold" column sm={2}>Last Name</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" defaultValue={userObject.last_name} name="last_name" placeholder="Add your last name" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formGroupPhoto">
          <Form.Label column sm={2} className="fw-bold">Photo URL</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" defaultValue={userObject.photo} name="photo" placeholder="Add your photo URL" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formGroupAbout">
          <Form.Label column sm={2} className="fw-bold">About Me</Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows={3} defaultValue={userObject.about} name="about" placeholder="Tell us about yourself" />
          </Col>
        </Form.Group>
        <div className="text-center">
          <Button variant="primary" type="submit" className="me-2">Submit</Button>
          <Button variant="secondary" onClick={handleGoBack}>
            <FaArrowLeft /> Go Back
          </Button>
        </div>
      </Form>
    </Container>
  );
}
