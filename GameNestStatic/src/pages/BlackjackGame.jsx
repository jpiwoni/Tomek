import React, {useState, useEffect} from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
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

  const playerScore = calculateHandValue(playerHand);
  const dealerScore = calculateHandValue(dealerHand);
    return (
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Blackjack</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
            <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#login">Login</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
          </Nav>
              <Navbar.Text>
                Signed in as: <a href="#login"></a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container>
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