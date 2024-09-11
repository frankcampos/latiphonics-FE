/* eslint-disable react-hooks/rules-of-hooks */
// eslint-disable-next-line react/prop-types
/* eslint-disable react/prop-types */
import { useState, React } from 'react';
import {
  Button, Card, Container, Modal,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { deleteSound, addSoundToList } from '../api/sounds.JS';

export default function SymbolCard({ objectSound, onUpdate }) {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const [isAdded, setIsAdded] = useState(objectSound.added);
  // eslint-disable-next-line no-unused-vars

  if (!objectSound) {
    console.error('soundObject is undefined');
    return null;
  }
  if (!objectSound) {
    console.error('soundObject is undefined');
    return null;
  }

  const handleDelete = () => {
    deleteSound(objectSound.id);
    setShow(!show);
    onUpdate();
  };

  const handleUpdateButton = () => {
    router.push({
      pathname: '/sounds/update',
      query: objectSound,
    });
  };

  // handleAddButton
  const handleAddButton = () => {
    setIsAdded(true);
    addSoundToList({ user_id: user.id, symbol_id: objectSound.id })
      .then(() => {
        onUpdate();
      })
      .catch((error) => {
        console.error('Error adding sound:', error);
        setIsAdded(false);
      });
  };

  const handleModal = () => {
    setShow(!show);
  };

  const placeholderImage = 'https://via.placeholder.com/150';
  return (
    <>
      <Card style={{ width: '250px', height: '500px', margin: '10px' }}>
        <Card.Body>
          <div className="image-container">
            <Card.Img variant="top" src={objectSound.picture_url || placeholderImage} alt="Sound" />
          </div>
          <Card.Text>
            {objectSound.pronunciation}
          </Card.Text>
          <Container className="d-flex flex-row justify-content-center align-content-center" style={{ padding: '1px' }}>
            <Button
              style={{ margin: '1px' }}
              onClick={handleAddButton}
              variant="success"
              disabled={isAdded}

            >
              Add
            </Button>
            <Button style={{ margin: '1px' }} onClick={handleModal} variant="danger">delete</Button>
            <Button style={{ margin: '1px' }} onClick={handleUpdateButton} variant="primary">update</Button>
          </Container>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Sound</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this sound: {objectSound.pronunciation} </Modal.Body>
        <Modal.Footer>
          <Container className="d-flex justify-content-around">
            <Button variant="secondary" onClick={handleModal}>
              cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Container>
        </Modal.Footer>
      </Modal>
    </>
  );
}
