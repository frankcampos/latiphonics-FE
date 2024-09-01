/* eslint-disable no-unused-vars */
import { useState } from 'react';

function Home() {
  const [mySound, setMySound] = useState([]);
  const soundLength = mySound.length;
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      {soundLength ? 'these are my sounds' : <h1>Add sounds to your list </h1>}

    </div>
  );
}

export default Home;
