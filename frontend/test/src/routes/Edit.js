import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import Nav from '../components/Nav';

function Edit() {
  const { id } = useParams(); // Get the id from the URL
  const navigate = useNavigate(); // For navigation after form submission
  const [character, setCharacter] = useState({
    name: '',
    job: '',
  });

  // Fetch data when the component mounts
  useEffect(() => {
    fetch(`/api/character/${id}`) // Fetch character by ID
      .then((res) => res.json())
      .then((data) => {
        setCharacter(data[0]); // Set the fetched data to the state
      });
  }, [id]); // Fetch again when id changes

  // Handle form submission
  const handleSubmit = async (character) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/update_character`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          id:id, // Include the id from the URL
          name: character.name,
          job: character.job,
        }),
      });

      // Process server response
      const result = await response.json();
      console.log('Response from server:', result);

      // Navigate back to home or some other page after successful submission
      navigate('/');
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  console.log(character)
  return (
    <div>
      <Nav />
      <div className="container">
        <Form character={character} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default Edit;
