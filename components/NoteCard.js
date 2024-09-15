/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
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
      <h5 className="text-left">My Notes</h5>
      {notes.length === 0 ? (
        <p className="text-left">Nothing to show</p>
      ) : (
        notes.map((note) => (
          <Card key={note.id} style={{ marginBottom: '10px' }} className="text-left">
            <Card.Body className="text-left">
              <Card.Text className="d-flex flex-column justify-content-center align-items-start">
                <strong>Note:</strong> {note.note_text}
              </Card.Text>
              <Button type="submit" onClick={() => handleDelete(note.id)} variant="danger">
                <FaTrash /> Delete
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
}
