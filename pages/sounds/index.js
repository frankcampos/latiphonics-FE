import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

export default function Sounds() {
  const router = useRouter();
  const handleClick = () => {
    console.warn('hola');
    router.push('/sounds/new');
  };
  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{
          borderColor: '10px', backgroundColor: 'green', height: '10vh',
        }}
      >
        <Button onClick={handleClick} type="button">add a sound</Button>
      </Container>
      <Container style={{ borderColor: '10px', backgroundColor: 'blue', height: '80vh' }} />
    </>
  );
}
