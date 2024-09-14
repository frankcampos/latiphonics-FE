/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import { deleteNote, getNotes } from '../api/note';

export default function NotesCard({ onUpdate }) {
  const [notes, setNotes] = useState([]);

  const fetchNotes = () => {
    getNotes().then((data) => {
      if (Array.isArray(data)) {
        setNotes(data);
      } else {
        console.error('Fetched data is not an array:', data);
      }
    }).catch((error) => {
      console.error('Error fetching notes:', error);
    });
  };

  const handleDelete = (id) => {
    deleteNote(id).then((success) => {
      if (success) {
        fetchNotes();
      }
    }).catch((error) => {
      console.error('Error deleting note:', error);
    });
  };

  useEffect(() => {
    fetchNotes();
  }, [onUpdate]);

  return (
    <Container style={{ padding: '20px', marginTop: '20px' }}>
      <h1>Your Notes</h1>
      {notes.length === 0 ? (
        <p>Nothing to show</p>
      ) : (
        notes.map((note) => (
          <Card key={note.id} style={{ marginBottom: '10px' }}>
            <Card.Body>
              <Card.Text>
                <strong>Note:</strong> {note.note_text}
              </Card.Text>
              <Button type="submit" onClick={() => handleDelete(note.id)} variant="danger">
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
}
