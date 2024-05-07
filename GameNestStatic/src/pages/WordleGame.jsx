import React, { useState, useEffect, createContext } from 'react'
import { Button } from 'react-bootstrap'
import WordleBoard from './Wordle/Board'
import DefaultBoard from './Wordle/DefaultBoard'
import '../styles/WordleStyle.css'

export const AppContext = createContext()

const wordApi = 'https://random-word-api.herokuapp.com/word?lang=en&length=5'
const defnApi = 'https://api.dictionaryapi.dev/api/v2/entries/en/'      // + word


const WordleGame = () => {
    const [word, setWord] = useState('?????')
    const [defn, setDefn] = useState([])
    const [isValid, setIsValid] = useState(false)
    const [inGame, setInGame] = useState(false)

    var board = DefaultBoard
    var attempt = {word: 0, letter: 0}
    var guess = ""
    var currLetter = ''

    async function getWord() {
        fetch(wordApi)
            .then(response => response.json())
            .then(data => setWord(data[0]))
            .catch(err => console.error("Error fetching word: ", err))
    }

    async function getDefn() {
        fetch(defnApi + guess)
            .then(response => response.json())
            .then((data) => {
                setDefn(data[0].meanings[0].definitions[0].definition);
                setIsValid(true)
            })
            .catch((error) => {
                console.log(error);
                setIsValid(false)
              })

    } 

    function checkIfValid() {
        getDefn()
        console.log(isValid)
        return isValid
    }

    function startGame() {
        getWord()
        setInGame(true)
    }

    async function handleKeyDown(event) {
        const input = event.key
        if (input === 'Enter') {    // user submits word
            if (guess.length == 5) {
                console.log("TODO: submit guess")
            } else {
                console.log("TODO: nothing happens")
            }
            
        } else if (input === 'Backspace' || input === 'Delete') {    // user deletes previous letter
            if (attempt.letter > 0) {
                console.log("previous", guess, attempt.letter)
                guess = guess.slice(0, -1)
                attempt = {word: attempt.word, letter: attempt.letter - 1}
                console.log("now", guess, attempt.letter)
            }

        } else if (input >= 'a' && input <= 'z') {
            // adds letter to current guess/word
            guess += input
            console.log("guess", guess)

            // adds letter to board
            const tempBoard = [...board]
            console.log("board", board)
            tempBoard[attempt.word][attempt.letter] = input.toUpperCase()
            board = tempBoard

            // moves to next letter position
            attempt = {word: attempt.word, letter: attempt.letter + 1}
            
        } else {
            console.log("invalid input")
        }
    };

    useEffect(() => {
       document.addEventListener('keydown', handleKeyDown);
      }, []);
    
    
    return (
        <div>
            <div className="header">
                <h1 className="title">WORDLE</h1>
            </div>
            <AppContext.Provider
                value={{
                    board,
                    attempt,
                    word
                }}>

                <div className="gameArea">
                    { !inGame &&
                        <Button variant="outline-success" size="xxl" className="mt-5" onClick={startGame}>Start Game</Button>
                    }
                    { inGame &&
                        <div>
                            <WordleBoard />
                            <h1>{word}</h1>
                        </div>
                    }
                </div>
            </AppContext.Provider>
        </div>
    )
}


export default WordleGame