import React, {useState, useEffect} from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../styles/blackjack.css';

const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

const createDeck = () => {
  const deck = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ suit, rank });
    }
  }
  return deck;
};

const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const calculateHandValue = (hand) => {
  let sum = 0;
  let aceCount = 0;
  for (let card of hand) {
    if (card.rank === 'Ace') {
      aceCount++;
      sum += 11;
    } else if (['Jack', 'Queen', 'King'].includes(card.rank)) {
      sum += 10;
    } else {
      sum += parseInt(card.rank);
    }
  }
  while (sum > 21 && aceCount > 0) {
    sum -= 10;
    aceCount--;
  }
  return sum;
};

const BlackjackGame = () => {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameOver, setGameOver] = useState(true);
  const [dealerTurn, setDealerTurn] = useState(false);
  const [result, setResult] = useState("");
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(0);

  useEffect(() => {
    setDeck(shuffleDeck(createDeck()));
  }, []);

  const startGame = () => {
    if (bet <= balance) {
      setBalance(balance - bet); // Deduct bet from balance
      const newDeck = shuffleDeck(createDeck());
      setPlayerHand([newDeck.pop(), newDeck.pop()]);
      setDealerHand([newDeck.pop(), newDeck.pop()]);
      setGameOver(false);
      setDealerTurn(false);
      setResult("");
    } else {
      alert("Please enter a valid bet amount!");
    }
  };

  const dealCard = () => {
    if (deck.length === 0) {
      return;
    }
    const newDeck = [...deck];
    const card = newDeck.pop();
    setDeck(newDeck);
    return card;
  };

  const hit = () => {
    const newPlayerHand = [...playerHand, dealCard()];
    setPlayerHand(newPlayerHand);
    if (calculateHandValue(newPlayerHand) > 21) {
      setDealerTurn(true);
      endGame();
    }
  };

  const stand = () => {
    setDealerTurn(true);
  };

  useEffect(() => {
    if (dealerTurn) {
      const dealerScore = calculateHandValue(dealerHand);
      if (dealerScore < 17) {
        const newDealerHand = [...dealerHand, dealCard()];
        setDealerHand(newDealerHand);
      } else {
        endGame();
      }
    }
  }, [dealerTurn, dealerHand]);

  const endGame = () => {
    setGameOver(true);
    const playerScore = calculateHandValue(playerHand);
  
    // Player busts
    if (playerScore > 21) {
      setResult("You busted! You lost!");
      setBalance(balance); // Deduct bet from balance
    } else {
      // Player didn't bust
      let dealerScore = calculateHandValue(dealerHand);
      while (dealerScore < 17) {
        dealerHand.push(deck.pop());
        dealerScore = calculateHandValue(dealerHand);
      }
      if (dealerScore > 21 || playerScore > dealerScore) {
        setResult("You won!");
        setBalance(balance + (bet * 2)); 
      } else if (playerScore === dealerScore) {
        setResult("It's a tie!");
        setBalance(balance + bet); 
      } else {
        setResult("You lost!");
        setBalance(balance); 
      }
    }
    setBet(0); // Reset bet amount
  };

  const handleBetChange = (e) => {
    const betAmount = parseInt(e.target.value);
    if (!isNaN(betAmount) && betAmount >= 0 && betAmount <= balance) {
      setBet(betAmount);
      setGameOver(true); // Reset gameOver state when bet is changed
    }
  };


  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  
  
  const playerScore = calculateHandValue(playerHand);
  const dealerScore = calculateHandValue(dealerHand);
    return (
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Blackjack</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
            <Nav className="me-auto">
            <Nav.Link to="/home">Home</Nav.Link>
            <Nav.Link onClick={handleShow1}>How to Play</Nav.Link>
            <Nav.Link onClick={handleShow2}>Player Stats</Nav.Link>
          </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container>
        <>
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>How To Play</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>In blackjack, your goal is to get as close to 21 without going over, 
          while having a higher number than the dealers hand. 
          <br></br>
          Each face card (Jack, Queen, King) count as ten, while an Ace can be 1 or 11.
          <br></br>
          Each number (2-10) counts as their respective value. 
          <br></br>
          You can start a game without entering a balance if you would like to practice.
          <br></br>
          Simply press "Start Game". Once pressed, you will see your hand, and the dealer's hand. Press hit if you would like another card,
          or stand if you are happy with your value.</p>
          <p>You win if:</p>
          <ul>
            <li>The dealer goes over 21.</li>
            <li>You and the dealer have numbers less than or equal to 21, but your number is greater.</li>
          </ul>
        <p>You lose if:</p>
          <ul>
            <li>Your hand goes over 21.</li>
            <li>Your hand and the dealer's hand have numbers less than or equal to 21, but the dealer's hand is greater.</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    <>
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Player Stats</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>Wins:</li>
            <li>Losses:</li>
            <li>Total Balance:</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
          <div className="balance-section">
            <h3>Your Balance: ${balance}</h3>
            <label>
              Bet amount:
              <input
                type="number"
                value={bet}
                onChange={handleBetChange}
                disabled={!gameOver}
              />
            </label>
            <button onClick={startGame} disabled={!gameOver}>Start Game</button>
          </div>
  
          <div className="hands">
            <div className="player-hand">
              <h2>Player Hand ({playerScore})</h2>
              <ul className="card-list">
                {playerHand.map((card, index) => (
                  <li key={index}>{card.rank} of {card.suit}</li>
                ))}
              </ul>
              {!gameOver && <button className="btn btn-primary" onClick={hit}>Hit</button>}
              {!gameOver && <button className="btn btn-primary" onClick={stand}>Stand</button>}
            </div>
  
            <div className="dealer-hand">
              <h2>Dealer Hand ({dealerScore})</h2>
              <ul className="card-list">
                {dealerHand.map((card, index) => (
                  <li key={index}>{card.rank} of {card.suit}</li>
                ))}
              </ul>
            </div>
          </div>
          {gameOver && <h2>{result}</h2>}
        </Container>
      </div>
    );
  };
  
  export default BlackjackGame;