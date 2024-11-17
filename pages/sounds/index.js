import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Container, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import SymbolCard from '../../components/SymbolCard';

import { getAllSounds } from '../../api/sounds.JS';
import { useAuth } from '../../utils/context/authContext';

export default function Sounds() {
  const router = useRouter();
  const [sounds, setSounds] = useState([]);
  const [update, setUpdate] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    getAllSounds(user.id).then((respond) => {
      setSounds(respond);
    });
  }, [user.id, update]);

  const onUpdate = () => {
    setUpdate((preVal) => preVal + 1);
    // setKey((preVal) => preVal + 1);
  };

  const handleClick = () => {
    router.push('/sounds/new');
  };
  return (
    <Container>
      <Container
        className="d-flex flex-wrap align-content-center justify-content-center "
        style={{ height: '10vh' }}
      >
        <Button variant="outline-primary" style={{ fontFamily: 'Arial, sans-serif' }} onClick={handleClick} type="button"><FaPlus /> Add a Sound</Button>
      </Container>
      <Container
        className="d-flex flex-wrap align-content-evenly justify-content-center"
      >
        {sounds.length > 1 ? sounds.map((sound) => <SymbolCard key={sound.id} objectSound={sound} onUpdate={onUpdate} />) : <h1>Sorry you do not have any sound yet</h1>}
      </Container>
    </Container>
  );
}
