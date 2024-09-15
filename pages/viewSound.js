/* eslint-disable no-cond-assign */
/* eslint-disable react/no-array-index-key */
import { useRouter } from 'next/router';

// eslint-disable-next-line import/no-extraneous-dependencies
import ReactPlayer from 'react-player';

import React, { useState, useEffect } from 'react';
import {
  Container, Form, Button, Image, Card, Row, Col,
} from 'react-bootstrap';
import { FaArrowLeft, FaCheck, FaVideo } from 'react-icons/fa';
import { addVideo } from '../api/mySounds';
import { useAuth } from '../utils/context/authContext';
import AddNoteCard from '../components/AddNoteCard';
import NotesCard from '../components/NoteCard';
import { getNotes } from '../api/note';

export default function ViewSound() {
  const router = useRouter();
  const [pictureUrl, setPictureUrl] = useState('');
  const { query } = router;
  const { user } = useAuth();
  const [onUpdate, setOnUpdate] = useState(0);

  const [videoUrl, setVideoUrl] = useState(query.video_url || '');
  const [isEditingVideo, setIsEditingVideo] = useState(!query.video_url);

  const handleOnUpdate = () => {
    setOnUpdate((prevState) => prevState + 1);
  };

  useEffect(() => {
    if (query.picture_url) {
      setPictureUrl(query.picture_url);
    }
    if (query.video_url) {
      setVideoUrl(query.video_url);
      setIsEditingVideo(false);
    }
  }, [query, pictureUrl]);

  const examplePhrases = query.example_phrases ? JSON.parse(query.example_phrases) : [];

  const handleVideoUrlChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const handleVideoUrlSubmit = (e) => {
    e.preventDefault();
    addVideo({ video_url: videoUrl, user_id: user.id }, query.id);
    setIsEditingVideo(false);
  };

  const handleOnclick = () => {
    router.back();
  };

  useEffect(() => {
    getNotes();
  }, [onUpdate]);

  return (
    <Container style={{ padding: '20px', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>
      <Card className="mb-4 shadow-sm" style={{ border: '1px solid #ddd' }}>
        <Row noGutters>
          <Col md={6}>
            <Image style={{ height: '100%', width: '100%', objectFit: 'cover' }} src={query.picture_url} alt="Sound" />
          </Col>
          <Col md={6}>
            <Card.Body>
              <h1>Example Phrases</h1>
              {examplePhrases.map((item, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <h3><strong>Phrase:</strong> {item.phrase}</h3>
                  <h3><strong>IPA:</strong> {item.ipa}</h3>
                </div>
              ))}
            </Card.Body>
          </Col>
        </Row>
      </Card>
      <Card className="mb-4 shadow-sm" style={{ border: '1px solid #ddd' }}>
        <Card.Body>
          <Card.Title><FaVideo /> Video</Card.Title>
          {isEditingVideo ? (
            <Form onSubmit={handleVideoUrlSubmit} style={{ marginBottom: '20px' }}>
              <Form.Group controlId="videoUrl">
                <Form.Label>Video URL</Form.Label>
                <Form.Control
                  type="url"
                  value={videoUrl}
                  onChange={handleVideoUrlChange}
                  placeholder="Enter video URL"
                  required
                  style={{ marginBottom: '10px' }}
                />
              </Form.Group>
              <Button variant="dark" type="submit" style={{ marginRight: '10px' }}>
                <FaCheck style={{ marginRight: '5px' }} />
                Submit
              </Button>
            </Form>
          ) : (
            <Row className="justify-content-center mb-4">
              <Col md={8}>
                <ReactPlayer url={videoUrl} width="100%" />
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>
      <Card className="mb-4 shadow-sm" style={{ border: '1px solid #ddd' }}>
        <Card.Body>
          <AddNoteCard learning_item={query.id} onUpdate={handleOnUpdate} />
        </Card.Body>
      </Card>
      <Card className="mb-4 shadow-sm" style={{ border: '1px solid #ddd', textAlign: 'left' }}>
        <Card.Body style={{ border: '1px solid #ddd', textAlign: 'left' }}>
          <NotesCard onUpdate={onUpdate} onUpdateSet={handleOnUpdate} />
        </Card.Body>
      </Card>
      <Button variant="outline-primary" type="button" onClick={handleOnclick} style={{ marginTop: '20px' }}>
        <FaArrowLeft style={{ marginRight: '5px' }} />
        Go back
      </Button>
    </Container>
  );
}
