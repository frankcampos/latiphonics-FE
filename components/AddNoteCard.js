/* eslint-disable camelcase */

/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import addNote from '../api/note';

export default function AddNoteCard({ learning_item, onUpdate }) {
  const [note, setNote] = useState('');

  const handleInputChange = (e) => {
    setNote(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addNote({ learning_item, note_text: note });
    setNote('');
    onUpdate();
  };

  return (
    <Container style={{ padding: '20px', marginTop: '20px' }}>
      <h1>Take your Notes here</h1>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="noteInput" style={{ marginBottom: '20px' }}>
          <Form.Label>Add a note</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={note}
            name="note_text"
            onChange={handleInputChange}
            placeholder="Type your note here"
            required
            style={{ width: '50%' }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Note
        </Button>
      </Form>
    </Container>
  );
}
