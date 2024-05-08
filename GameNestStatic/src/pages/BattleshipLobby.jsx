import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { CreateLobby, JoinLobby } from '../components/Battleship';

const BattleshipLobby = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Welcome to Battleship</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6}>
          <CreateLobby />
        </Col>
        <Col xs={12} md={6}>
          <JoinLobby />
        </Col>
      </Row>
    </Container>
  );
};

export default BattleshipLobby;