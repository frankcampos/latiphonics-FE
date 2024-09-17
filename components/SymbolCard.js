/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, React, useEffect } from 'react';
import {
  Button, Card, Container, Modal, Row, Col,
} from 'react-bootstrap';
import 'firebase/storage';
import firebase from 'firebase/app';
import { useRouter } from 'next/router';
import {
  FaTrash, FaPlus, FaEdit, FaTimes,
} from 'react-icons/fa';
import { useAuth } from '../utils/context/authContext';
import { deleteSound, addSoundToList } from '../api/sounds.JS';

export default function SymbolCard({ objectSound, onUpdate }) {
  const [show, setShow] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const router = useRouter();
  const { user } = useAuth();
  const [isAdded, setIsAdded] = useState(objectSound.added);

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

  const getUrlSound = async () => {
    try {
      const storage = firebase.storage();
      const storageRef = storage.ref();
      const soundRef = storageRef.child(objectSound?.sound_url);
      const url = await soundRef.getDownloadURL();
      setAudioUrl(url);
    } catch (error) {
      console.error('Error getting sound:', error);
    }
  };

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

  useEffect(() => {
    getUrlSound();
  }, [objectSound]);

  const handleImageClick = () => {
    const audioElement = document.getElementById(`audio-${objectSound.id}`);
    if (audioElement) {
      audioElement.play();
    }
  };

  const placeholderImage = 'https://via.placeholder.com/150';
  return (
    <>
      <Card
        className="m-3 shadow-lg rounded card-hover"
        style={{
          width: '250px', height: '500px', margin: '10px', fontFamily: 'Arial, sans-serif', borderRadius: '15px',
        }}
      >
        <Card.Body className="d-flex flex-column justify-content-between">
          <div className="image-container d-flex justify-content-center">
            <Card.Img
              variant="top"
              src={objectSound.picture_url || placeholderImage}
              alt="Sound"
              onClick={handleImageClick}
              className="clickable-image"
            />
          </div>
          <Card.Text className="text-center">
            {objectSound.pronunciation}
          </Card.Text>
          <Container className="d-flex flex-column justify-content-center align-items-center" style={{ padding: '1px' }}>
            <Row className="w-100">
              <Col className="p-1 d-flex justify-content-center">
                <Button
                  onClick={handleAddButton}
                  variant="dark"
                  disabled={isAdded}
                  className="text-center"
                  style={{ width: '90%' }}
                >
                  <FaPlus /> Add to List
                </Button>
              </Col>
            </Row>
            <Row className="w-100">
              <Col className="p-1 d-flex justify-content-center">
                <Button
                  onClick={handleModal}
                  variant="danger"
                  className="text-center"
                  style={{ width: '90%' }}
                >
                  <FaTrash /> Delete
                </Button>
              </Col>
            </Row>
            <Row className="w-100">
              <Col className="p-1 d-flex justify-content-center">
                <Button
                  onClick={handleUpdateButton}
                  variant="primary"
                  className="text-center"
                  style={{ width: '90%' }}
                >
                  <FaEdit /> Update
                </Button>
              </Col>
            </Row>
            {audioUrl && (
              <audio id={`audio-${objectSound.id}`} src={audioUrl}>
                <track kind="captions" />
              </audio>
            )}
          </Container>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleModal} style={{ fontFamily: 'Arial, sans-serif' }}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Sound</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this sound: {objectSound.pronunciation} </Modal.Body>
        <Modal.Footer>
          <Container className="d-flex justify-content-around">
            <Button variant="secondary" onClick={handleModal}>
              <FaTimes /> Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              <FaTrash /> Delete
            </Button>
          </Container>
        </Modal.Footer>
      </Modal>
    </>
  );
}
