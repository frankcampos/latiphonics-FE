// I need to get the user
// pass the picture, first name, lastname
// add about and the about from the user
// add a button to edit the user
// the button will send me to another page to edit the user
// add link in the navbar component
import React, { useEffect, useState } from 'react';
import {
  Button, Image, Container, Row, Col,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';

export default function MyProfile() {
  const { user } = useAuth();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(user);

  const handleOnclick = () => {
    router.push({
      pathname: '/profile/edit',
      query: user,
    });
  };

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user, router]);

  useEffect(() => {
    const handleRouteChange = () => {
      router.reload();
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center mb-4">
        <Col xs="auto">
          <Image src={user.photo} alt={`${user.first_name} ${user.last_name}`} className="profile-image rounded-circle" />
        </Col>
      </Row>
      <Row className="justify-content-center mb-4">
        <Col xs="auto">
          <h1 className="text-center fw-bold">{user.first_name} {user.last_name}</h1>
        </Col>
      </Row>
      <Row className="justify-content-center mb-4">
        <Col xs="auto">
          <h2 className="text-center fw-bolder text-decoration-underline">About Me</h2>
          <h3 className="text-center">{user.about}</h3>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="auto">
          <Button onClick={handleOnclick}>
            Edit
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="secondary" onClick={handleGoBack}>
            Go Back
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
