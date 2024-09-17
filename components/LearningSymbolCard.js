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
import { FaTrash, FaEye, FaTimes } from 'react-icons/fa';
import {
  Card, Container, Button, Modal, Row, Col,
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
        sound_url: symbol.sound_url,
      },
    });
  };

  const placeholderImage = 'https://via.placeholder.com/150';

  return (
    <>

      <Card
        className="m-3 shadow-lg rounded  card-hover"
        style={{
          width: '250px', height: '400px', fontFamily: 'Arial, sans-serif', borderRadius: '15px',
        }}
      >
        <Card.Body className="d-flex flex-column justify-content-between">
          <div className="image-container">
            <Card.Img variant="top" src={symbol?.picture_url || placeholderImage} alt="Sound" />
          </div>
          <Card.Text className="card-text">
            {symbol.pronunciation}
          </Card.Text>
          <Container fluid className="d-flex justify-content-around flex-wrap">
            <Row className="w-100">
              <Col className="p-1">
                <Button className="w-100 text-center" onClick={handleModal} variant="danger">
                  <FaTrash />
                </Button>
              </Col>
              <Col className="p-1">
                <Button className="w-100 text-center" onClick={handleViewButton} variant="dark">
                  <FaEye />
                </Button>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
      <Modal show={show} style={{ fontFamily: 'Arial, sans-serif' }} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>remove</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove this sound: {objectLearningSymbol?.pronunciation}</Modal.Body>
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
