/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-boolean-value */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Form, Button, Container, Row, Col,
} from 'react-bootstrap';
import { createSound, updateSound } from '../api/sounds.JS';

function SoundForm({ objSound }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    picture_url: '',
    pronunciation: '',
    is_voiced: true,
    is_vowel: true,
  });

  useEffect(() => {
    if (objSound.id) setFormData({ ...objSound });
  }, [objSound]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value === 'true' ? true : value === 'false' ? false : value,
    }));
  };

  const convertFormData = (data) => ({
    ...data,
    is_voiced: data.is_voiced === 'true' ? true : data.is_voiced === 'false' ? false : data.is_voiced,
    is_vowel: data.is_vowel === 'true' ? true : data.is_vowel === 'false' ? false : data.is_vowel,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const convertedData = convertFormData(formData);
    if (objSound.id) {
      await updateSound(convertedData, objSound.id);
      router.push('/sounds');
    } else {
      await createSound(convertedData);
      router.push('/sounds');
    }
  };

  return (
    <Container style={{ fontFamily: 'Arial, sans-serif' }}>
      <h2 className="my-4 text-center">{objSound.id ? 'Update the Sound' : 'Add a Sound'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formGroupPictureUrl">
          <Form.Label column sm={2}>Picture</Form.Label>
          <Col sm={10}>
            <Form.Control type="url" value={formData.picture_url} name="picture_url" onChange={handleChange} placeholder="Add the URL picture" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formGroupPronunciation">
          <Form.Label column sm={2}>Pronunciation</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" value={formData.pronunciation} name="pronunciation" onChange={handleChange} placeholder="Add pronunciation" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formSelectVowel">
          <Form.Label column sm={2}>Sound Type</Form.Label>
          <Col sm={10}>
            <Form.Select name="is_vowel" value={formData.is_vowel} onChange={handleChange} aria-label="Select sound type">
              <option value="">Select sound type</option>
              <option value="true">Vowel</option>
              <option value="false">Consonant</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formSelectVoiced">
          <Form.Label column sm={2}>Voicing</Form.Label>
          <Col sm={10}>
            <Form.Select name="is_voiced" value={formData.is_voiced} onChange={handleChange} aria-label="Select voicing">
              <option value="">Select voicing</option>
              <option value="true">Voiced</option>
              <option value="false">Unvoiced</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <div className="text-center">
          <Button variant="primary" type="submit">
            {objSound.id ? 'Update' : 'Submit'}
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default SoundForm;
