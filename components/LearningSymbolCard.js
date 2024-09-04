/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
// I need to create a card almost identical to the symbolcard
// only two buttons, view and remove.
// export  I need a modal to display a warning when I click the remove button
// call the endpoint to get all learning_item_ symbol
// when I click the button view send the learning item object to populate the view page
// update or refresh the page every time that I click the button remove

import { React, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card, Container, Button, Modal,
} from 'react-bootstrap';
import { deleteMySound } from '../api/mySounds';

export default function LearningSymbolCard({ objectLearningSymbol, onUpdate }) {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const { symbol, learning_symbol } = objectLearningSymbol;

  const handleModal = () => {
    setShow(!show);
  };

  const handleDelete = () => {
    deleteMySound(objectLearningSymbol.id);
    onUpdate();
    handleModal();
  };

  const handleViewButton = () => {
    router.push({
      pathname: '/viewSound',
      query: {
        ...learning_symbol,
        picture_url: symbol.picture_url,
      },
    });
  };
  const placeholderImage = 'https://via.placeholder.com/150';
  return (
    <>
      <Card style={{ width: '250px', height: '450px', margin: '10px' }}>
        <Card.Body>
          <div className="image-container">
            <Card.Img variant="top" src={symbol?.picture_url || placeholderImage} alt="Sound" />
          </div>
          <Card.Text>
            {symbol.pronunciation}
          </Card.Text>
          <Container className="d-flex flex-row justify-content-center align-content-center" style={{ padding: '1px' }}>
            <Button style={{ margin: '1px' }} onClick={handleModal} variant="danger">remove</Button>
            <Button style={{ margin: '1px' }} onClick={handleViewButton} variant="primary">view</Button>
          </Container>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>remove</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove this sound: {objectLearningSymbol?.pronunciation}</Modal.Body>
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
