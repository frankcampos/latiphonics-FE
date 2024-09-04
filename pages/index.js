/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import LearningSymbolCard from '../components/LearningSymbolCard';
import { getAllMySounds } from '../api/mySounds';

function Home() {
  const [mySounds, setMySounds] = useState([]);
  const [onUpdate, setOnUpdate] = useState(0);
  const soundLength = mySounds.length;

  const handleOnUpdate = () => {
    setOnUpdate((prevState) => prevState + 1);
  };
  const getSounds = () => {
    getAllMySounds().then((respond) => {
      setMySounds(respond);
    });
  };

  useEffect(() => {
    getSounds();
  },
  [onUpdate]);

  return (
    <Container className="d-flex flex-column flex-wrap justify-content-center align-content-center">
      <div
        className="d-flex  flex-wrap justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '1000px',
          margin: '0 auto',
          flexDirection: 'row',
        }}
      >
        {soundLength ? mySounds.map((sound) => <LearningSymbolCard key={sound.id} objectLearningSymbol={sound} onUpdate={handleOnUpdate} />)
          : <h1>Add sounds to your list </h1>}

      </div>
    </Container>
  );
}

export default Home;
