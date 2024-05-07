import React from 'react';
import Button from 'react-bootstrap/Button';

const CreateLobby = ({ onCreateLobby }) => {
  const handleCreateLobby = () => {
    onCreateLobby();
  };

  return (
    <div>
      <h2>Create Lobby</h2>
      <Button onClick={handleCreateLobby}>Create Lobby</Button>
    </div>
  );
};

export default CreateLobby;