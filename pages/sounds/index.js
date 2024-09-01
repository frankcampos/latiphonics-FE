import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import SymbolCard from '../../components/SymbolCard';

import { getAllSounds } from '../../api/sounds.JS';

export default function Sounds() {
  const router = useRouter();
  const [sounds, setSounds] = useState([]);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    getAllSounds().then((respond) => {
      setSounds(respond);
    });
  }, [update]);

  const onUpdate = () => {
    setUpdate((preVal) => preVal + 1);
    // setKey((preVal) => preVal + 1);
  };

  const handleClick = () => {
    console.warn('hola');
    router.push('/sounds/new');
  };
  return (
    <Container>
      <Container
        className="d-flex flex-wrap align-content-center justify-content-center "
        style={{
          borderColor: 'black', backgroundColor: 'green', height: '10vh',
        }}
      >
        <Button onClick={handleClick} type="button">add a sound</Button>
      </Container>
      <Container
        className="d-flex flex-wrap align-content-evenly justify-content-center"
        style={{
          borderColor: '10px', backgroundColor: 'blue', height: '100vh',
        }}
      >
        {sounds.length > 1 ? sounds.map((sound) => <SymbolCard key={sound.id} objectSound={sound} onUpdate={onUpdate} />) : <h1>Sorry you do not have any sound yet</h1>}
      </Container>
    </Container>
  );
}
