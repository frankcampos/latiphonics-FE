import React from 'react';
import { useRouter } from 'next/router';
import SoundForm from '../../components/SoundForm';

function NewSound() {
  const router = useRouter();
  const { query } = router;

  // fetch the sound that I need.
  return (
    <>
      <SoundForm objSound={query} />
    </>
  );
}

export default NewSound;
