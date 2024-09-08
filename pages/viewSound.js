/* eslint-disable no-cond-assign */
/* eslint-disable react/no-array-index-key */
import { useRouter } from 'next/router';

// eslint-disable-next-line import/no-extraneous-dependencies
import ReactPlayer from 'react-player';

import React, { useState, useEffect } from 'react';
import {
  Container, Form, Button, Image,
} from 'react-bootstrap';
import { addVideo } from '../api/mySounds';
import { useAuth } from '../utils/context/authContext';

export default function ViewSound() {
  const router = useRouter();
  const [pictureUrl, setPictureUrl] = useState('');
  const { query } = router;
  console.warn(query.picture_url);
  const { user } = useAuth();
  console.warn('this is my user', user);

  const [videoUrl, setVideoUrl] = useState(query.video_url || '');
  const [isEditingVideo, setIsEditingVideo] = useState(!query.video_url);

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

  return (
    <Container style={{ padding: '20px', marginTop: '20px' }}>
      <h1>View Sound Details</h1>
      <Image style={{ height: '400px', marginBottom: '20px' }} src={query.picture_url} alt="Sound" />
      <h2>Example Phrases</h2>
      {examplePhrases.map((item, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <p><strong>Phrase:</strong> {item.phrase}</p>
          <p><strong>IPA:</strong> {item.ipa}</p>
        </div>
      ))}
      <h2>Video</h2>
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
          <Button variant="primary" type="submit" style={{ marginRight: '10px' }}>
            Submit
          </Button>
        </Form>
      ) : (
        <ReactPlayer url={videoUrl} style={{ marginBottom: '20px' }} />
      )}
      <Button variant="primary" type="button" onClick={handleOnclick}>
        Go back
      </Button>
    </Container>
  );
}
