/* eslint-disable camelcase */

/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
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
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="noteInput" style={{ marginBottom: '20px' }}>
          <Form.Control
            as="textarea"
            rows={3}
            value={note}
            name="note_text"
            onChange={handleInputChange}
            placeholder="Type your note here"
            required
            style={{ width: '100%' }}
          />
        </Form.Group>
        <Button variant="dark" type="submit">
          <FaPlusCircle />
        </Button>
      </Form>
    </Container>
  );
}
