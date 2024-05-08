import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Board } from '../components/Battleship';
import { BattleshipGameStatus } from '../enums';
import { stringToState } from '../enums/BattleshipGameStatus';
import { useAppSelector, userSelector } from '../redux';
import { getSocket } from '../utils';

const BattleshipGame = () => {
    const user = useAppSelector(userSelector);
    const { lobbyId } = useParams();
    const [socketInitialized, setSocketInitialized] = React.useState(false);
    const [gameState, setGameState] = React.useState(BattleshipGameStatus.SETUP);
    const [gameData, setGameData] = React.useState(null);


    useEffect(() => {
        if (!lobbyId || !user) return;

        const socket = getSocket(lobbyId, user);

        if (!socketInitialized) {
            socket.addEventListener("message", (event) => {
                const message = JSON.parse(event.data);
                if (message.type) {
                    if (message.type === "error") {
                        toast.error(message.message);
                    } else if (message.type === "playerJoined") {
                        toast.info(`${message.player} has joined the game.`);
                        setGameData(message.data);
                    } else if (message.type === "boardSubmitted") {
                        toast.info(`${message.player} has submitted their board.`);
                    } else if (message.type === "gameState") {
                        setGameData(message.data);
                        if (message.data.state) {
                            setGameState(stringToState(message.data.state));
                        }
                    } else if (message.type === "setGameInProgress") {
                        setGameState(BattleshipGameStatus.PLAYING);
                        toast.info("Game has started!");
                    }
                }
            });
            setSocketInitialized(true);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lobbyId, user]);

    const onClick = (rowIndex, cellIndex) => {
        // make sure it is our turn
        if (gameData.player1Turn && gameData.player1 !== user.user) {
            toast.error("It is not your turn");
            return;
        } else if (!gameData.player1Turn && gameData.player2 !== user.user) {
            toast.error("It is not your turn");
            return;
        }

        const socket = getSocket(lobbyId, user);
        socket.send(JSON.stringify({
            type: "fire",
            lobbyId: lobbyId,
            player: user.user,
            coordinates: [rowIndex, cellIndex]
        }));
    }

    const ignoreClick = () => {

    }

    if (!user) {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>Battleship</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>Please log in to play Battleship</h2>
                    </Col>
                </Row>
            </Container>
        );
    }

    let board;
    let isPlayerOne = true;
    let player2 = "Waiting for player";
    if (gameData) {
        isPlayerOne = gameData.player1 === user.user;
        if (gameData.player2 !== null) player2 = gameData.player2;
        board = gameData.player1Turn ? gameData?.player2Board : gameData?.player1Board;
    } else {
        board = {}
        board.ships = []
        board.board = Array(10).fill(Array(10).fill(null));
    }


    return (
        <Container>
            <Row>
                <Col>
                    <h1>Battleship</h1>
                </Col>
            </Row>
            {gameState === BattleshipGameStatus.SETUP && <>
                <Row>
                    <Col>
                        <h3>Setup your board</h3>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4} md={4} className={`d-none d-lg-block`}></Col>
                    <Col lg={4} md={8} sm={12}>
                        <h5>Playing against <i>{(isPlayerOne ? player2 : gameData.player1)}</i></h5>
                        <hr />
                        <Board board={board.board} gameState={gameState} ships={board.ships} onClick={ignoreClick} />
                    </Col>
                    <Col lg={4} md={4}>
                        <p>
                            <strong>Lobby Code:</strong>
                            <br />
                            {lobbyId}
                            <br />
                            <br />
                            Give this code to another player to let them join your game.
                            <br />
                            <br />
                            <strong>Instructions:</strong>
                            <br />
                            Place your ships on the board by clicking on the squares. Right clicking will rotate the ship.
                            <br />
                            When you are ready, click the submit button to submit your board and wait for your opponent to submit theirs.
                            <br />
                            Once both players have submitted their boards, the game will begin.
                            <br />
                            <br />
                            <strong>Ship Sizes:</strong>
                            <br />
                            Aircraft Carrier (5 squares)
                            <br />
                            Battleship (4 squares)
                            <br />
                            Submarine (3 squares)
                            <br />
                            Cruiser (3 squares)
                            <br />
                            Destroyer (2 squares)
                        </p>
                    </Col>
                </Row>
            </>
            }
            {gameData && (gameState === BattleshipGameStatus.PLAYING || gameState === BattleshipGameStatus.GAME_OVER) && <>
                <Row>
                    <Col>
                        {gameState === BattleshipGameStatus.GAME_OVER && <h3>Game Over {gameData.winner} has won!</h3>}
                        {gameState === BattleshipGameStatus.PLAYING && <h3>{gameData.player1Turn ? gameData.player1 : gameData.player2}'s Turn</h3>}
                    </Col>
                </Row>
                <Row>
                    <Col lg={2} md={2} className={`d-none d-lg-block`}></Col>
                    <Col lg={4} md={4} sm={12}>
                        <h5>Your Board</h5>
                        <Board
                            board={isPlayerOne ? gameData.player1Board.board : gameData.player2Board.board}
                            gameState={gameState}
                            ships={isPlayerOne ? gameData.player1Board.ships : gameData.player2Board.ships}
                            onClick={ignoreClick} />
                    </Col>
                    <Col lg={4} md={4} sm={12}>
                        <h5>{isPlayerOne ? gameData.player2 : gameData.player1}'s Board</h5>
                        <Board
                            board={isPlayerOne ? gameData.player2Board.board : gameData.player1Board.board}
                            gameState={gameState}
                            ships={isPlayerOne ? gameData.player2Board.ships : gameData.player1Board.ships}
                            onClick={onClick} />
                    </Col>
                </Row>
            </>
            }

        </Container>
    );
};

export default BattleshipGame;