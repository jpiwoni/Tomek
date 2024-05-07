import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const JoinLobby = ({ onJoinLobby }) => {
    const [lobbyId, setLobbyId] = useState('');

    const handleJoinLobby = () => {
        if (lobbyId.trim() !== '') {
            onJoinLobby(lobbyId);
        } else {
            alert('Please enter the lobby ID');
        }
    };

    return (
        <div>
            <h2>Join Lobby</h2>
            <Form.Group controlId="formLobbyId">
                <Form.Control
                    type="text"
                    placeholder="Lobby ID"
                    value={lobbyId}
                    onChange={(e) => setLobbyId(e.target.value)}
                />
            </Form.Group>
            <Button onClick={handleJoinLobby}>Join Lobby</Button>
        </div>
    );
};

export default JoinLobby;