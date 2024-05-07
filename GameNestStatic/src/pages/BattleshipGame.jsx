import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Board } from '../components/Battleship';
import { BattleshipGameStatus } from '../enums';

const BattleshipGame = () => {
    const { lobbyId } = useParams();

    const [gameState, setGameState] = React.useState(BattleshipGameStatus.SETUP);

    useEffect(() => {
        verifyUserInLobby(lobbyId);
        setGameState(BattleshipGameStatus.SETUP);
    }, [lobbyId]);

    const verifyUserInLobby = (lobbyId) => {
        console.log(`Verifying user in lobby ${lobbyId}`);
    };

    // Create an empty board full of 1s

    const boardJson = `{
    "player1": {
        "ships": [

        ],
        "board": [

        ]
    }
}`;

    const player1 = JSON.parse(boardJson).player1;
    player1.board = Array(10).fill().map(() => Array(10).fill(null));
    const board = player1.board;
    const ships = player1.ships;

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Battleship Game</h1>
                </Col>
            </Row>
            <Row>
                <Col lg={4} md={4} className={`d-none d-lg-block`}></Col>
                <Col lg={4} md={8} sm={12}>
                    <Board board={board} gameState={gameState} ships={ships} />
                </Col>
            </Row>
        </Container>
    );
};

export default BattleshipGame;