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
  }, [onUpdate]);

  return (
    <Container className="d-flex flex-column align-items-center" style={{ height: '100vh', overflow: 'hidden' }}>
      <Container
        className="d-flex flex-wrap justify-content-center align-content-start"
        style={{
          height: 'calc(100vh - 60px)',
          maxWidth: '1000px',
          overflowY: 'auto',
          margin: '0 auto',
        }}
      >
        {soundLength ? mySounds.map((sound) => (
          <LearningSymbolCard key={sound.id} objectLearningSymbol={sound} onUpdate={handleOnUpdate} />
        )) : <h1>Add sounds to your list </h1>}
      </Container>
    </Container>
  );
}

export default Home;
