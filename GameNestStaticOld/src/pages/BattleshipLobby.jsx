import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { CreateLobby, JoinLobby } from '../components/Battleship';

const BattleshipLobby = ({ onCreateLobby, onJoinLobby }) => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Welcome to Battleship</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6}>
          <CreateLobby onCreateLobby={onCreateLobby} />
        </Col>
        <Col xs={12} md={6}>
          <JoinLobby onJoinLobby={onJoinLobby} />
        </Col>
      </Row>
    </Container>
  );
};

export default BattleshipLobby;