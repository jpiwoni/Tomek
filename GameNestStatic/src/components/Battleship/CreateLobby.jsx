import React from 'react';
import Button from 'react-bootstrap/Button';

const CreateLobby = () => {
  const handleCreateLobby = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    window.location.href = `/battleship/${code}`;
  };

  return (
    <div>
      <h2>Create Lobby</h2>
      <Button onClick={handleCreateLobby}>Create Lobby</Button>
    </div>
  );
};

export default CreateLobby;