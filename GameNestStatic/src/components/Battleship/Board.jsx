import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { BattleshipGameStatus, BattleshipShips, stringToShip } from "../../enums";
import { getSocket } from "../../utils";
import { checkIntersection } from "../../utils/Battleship/battleshipHelpers";
import BoardLabelRow from "./BoardLabelRow";
import BoardRow from "./BoardRow";

const Board = ({ board, ships, gameState, onClick }) => {
    const [placedShips, setPlacedShips] = React.useState([]);
    const [shipPlaceVertical, setShipPlaceVertical] = React.useState(false);
    const [shipPlaceLocation, setShipPlaceLocation] = React.useState([0, 0]);
    const [selectedShip, setSelectedShip] = React.useState(BattleshipShips.CARRIER);
    const [setupComplete, setSetupComplete] = React.useState(false);

    useEffect(() => {
        if (placedShips.length === 0 && ships.length !== 0) {
            setPlacedShips(ships);
            setSetupComplete(true);
        }
    }, [placedShips, ships]);

    function onCellClick(rowIndex, cellIndex) {
        if (gameState === BattleshipGameStatus.SETUP) {
            if (setupComplete) {
                toast.error("Board already submitted");
                return;
            }
            const placedShipsCopy = [...placedShips].filter(ship => ship.type !== selectedShip.name);
            let foundIntersection = false;

            // Make sure ship isn't going to intersect with other ships
            placedShipsCopy.forEach(ship => {
                ship = { ...ship, length: stringToShip(ship.type).length };
                if (checkIntersection(ship, { location: [rowIndex, cellIndex], length: selectedShip.length, rotated: shipPlaceVertical })) {
                    foundIntersection = true;
                    return;
                }
            });

            if (foundIntersection) {
                toast.error("Ship intersects with another ship");
                return;
            }

            // Place ship
            placedShipsCopy.push({
                type: selectedShip.name,
                location: [rowIndex, cellIndex],
                rotated: shipPlaceVertical,
                sunk: false
            });
            setPlacedShips(placedShipsCopy);
        } else if (gameState === BattleshipGameStatus.PLAYING) {
            onClick(rowIndex, cellIndex);
        }
    }

    function submitBoard() {
        const socket = getSocket(null, null)
        const message = {
            type: "initialBoard",
            ships: placedShips
        };

        socket.send(JSON.stringify(message));
        setSetupComplete(true);
    }

    function onCellMouseOver(rowIndex, cellIndex) {
        if (gameState === BattleshipGameStatus.SETUP) {
            setShipPlaceLocation([rowIndex, cellIndex]);
        }
    }

    // Detect right click
    function onContextMenu(e) {
        e.preventDefault();
        setShipPlaceVertical(!shipPlaceVertical);
    }

    function drawBoard() {
        const boardCopy = JSON.parse(JSON.stringify(board));

        if (gameState === BattleshipGameStatus.SETUP) {
            // Place ship
            let [x, y] = shipPlaceLocation;
            const length = selectedShip.length;
            if (shipPlaceVertical) {
                // Check if ship is out of bounds
                if (x + length > 10) {
                    x = 10 - length;
                }
                for (let i = 0; i < length; i++) {
                    boardCopy[x + i][y] = "highlighted";
                }
            } else {
                // Check if ship is out of bounds
                if (y + length > 10) {
                    y = 10 - length;
                }
                for (let i = 0; i < length; i++) {
                    boardCopy[x][y + i] = "highlighted";
                }
            }

            // Draw ships
            placedShips.forEach(ship => {
                let [x, y] = ship.location;
                const length = stringToShip(ship.type).length;
                if (ship.rotated) {
                    if (x + length > 10) {
                        x = 10 - length;
                    }
                    for (let i = 0; i < length; i++) {
                        boardCopy[x + i][y] = "sunk";
                    }
                } else {
                    if (y + length > 10) {
                        y = 10 - length;
                    }
                    for (let i = 0; i < length; i++) {
                        boardCopy[x][y + i] = "sunk";
                    }
                }
            });
        } else {
            ships.forEach(ship => {
                const [x, y] = ship.location;
                const length = stringToShip(ship.type).length;
                if (ship.rotated) {
                    const sunk = boardCopy.map(row => row[y]).slice(x, x + length);
                    for (let i = 0; i < length; i++) {
                        if (sunk) {
                            if (boardCopy[x + i][y] === "hit") {
                                boardCopy[x + i][y] = "hit sunk";
                            } else {
                                boardCopy[x + i][y] = "sunk";
                            }
                        }
                    }
                } else {
                    const sunk = boardCopy[x].slice(y, y + length);
                    for (let i = 0; i < length; i++) {
                        if (sunk) {
                            if (boardCopy[x][y + i] === "hit") {
                                boardCopy[x][y + i] = "hit sunk";
                            } else {
                                boardCopy[x][y + i] = "sunk";
                            }
                        }
                    }
                }
            });
        }

        // get each row then create a BoardRow
        return boardCopy.map((row, rowIndex) => {
            return (
                <BoardRow key={rowIndex} row={row} rowIndex={rowIndex} onClick={onCellClick} onMouseOver={onCellMouseOver} />
            );
        });
    }


    return (
        <div onContextMenu={onContextMenu}>
            <Row>
                <Col>
                    {<BoardLabelRow />}
                    {drawBoard()}
                </Col>
            </Row>
            {gameState === BattleshipGameStatus.SETUP &&
                <Row className="mt-4">
                    <Col>
                        {Object.keys(BattleshipShips).map(ship => {
                            return (
                                <button className={`btn ${selectedShip.name.toUpperCase() === ship ? "btn-primary" : "btn-secondary"} ship-select`} key={ship} onClick={() => setSelectedShip(BattleshipShips[ship])}>{ship}</button>
                            );
                        })}
                    </Col>
                    <Col>
                        <button className="btn btn-primary" disabled={placedShips.length !== Object.keys(BattleshipShips).length || setupComplete} onClick={submitBoard}>Submit</button>
                    </Col>
                </Row>
            }
        </div>
    );
};

export default Board;