import React, { useState, useEffect, createContext } from 'react'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import WordleBoard from './Wordle/Board'
import DefaultBoard from './Wordle/DefaultBoard'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/WordleStyle.css'

export const AppContext = createContext()

const wordApi = 'https://random-word-api.herokuapp.com/word?lang=en&length=5'
const defnApi = 'https://api.dictionaryapi.dev/api/v2/entries/en/'      // + word


const WordleGame = () => {
    const [word, setWord] = useState("wordy")
    const [defn, setDefn] = useState([])
    const [isValid, setIsValid] = useState(false)
    const [inGame, setInGame] = useState(false)
    const [boardState, setBoardState] = useState([DefaultBoard])

    var correctWord = ""
    var board = DefaultBoard
    var attempt = {word: 0, letter: 0}
    var guess = ""
    var attemptWordNum = 0

    async function getWord() {
        fetch(wordApi)
            .then(response => response.json())
            .then(data => {
                setWord(data[0])
                correctWord = data[0]
            })
            .catch(err => {
                console.error("Error fetching word: ", err)
                setWord("wordy")
                correctWord = "wordy"
            })
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

    function resetGame() {
        board = DefaultBoard
        attempt = {word: 0, letter: 0}
        guess = ''
        setInGame(false)
    }

    async function handleKeyDown(event) {
        const input = event.key
        if (input === 'Enter') {    // user submits word
            if (guess.length == 5) {
                if (guess === word) {
                    toast.success('You won!!!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                    setTimeout(() => {
                        window.location.reload()
                      }, 5000)
                    

                } else if (attempt.word == 5) {
                    toast.error('You lost 😔', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                    setTimeout(() => {
                        window.location.reload()
                      }, 5000)
                
                } else {
                    attempt = {word: attempt.word + 1, letter: 0}
                    attemptWordNum += 1
                    guess = ''
                }
            } 
            
        } else if (input === 'Backspace' || input === 'Delete') {    // user deletes previous letter
            if (attempt.letter > 0) {
                guess = guess.slice(0, -1)
                attempt = {word: attempt.word, letter: attempt.letter - 1}

                const tempBoard = [...board]
                tempBoard[attempt.word][attempt.letter] = ''
                board = tempBoard

            }

        } else if (input >= 'a' && input <= 'z') {
            if (guess.length < 5) {
                // adds letter to current guess/word
                guess += input

                // adds letter to board
                const tempBoard = [...board]
                tempBoard[attempt.word][attempt.letter] = input.toUpperCase()
                board = tempBoard

                // moves to next letter position
                attempt = {word: attempt.word, letter: attempt.letter + 1}

            } 
        }
        setBoardState(board)
    }

    useEffect(() => {
       document.addEventListener('keydown', handleKeyDown);
       setBoardState(board)
      }, [word, attemptWordNum]);
    
    
    return (
        <div>
            <div className="header">
                <h1 className="title">WORDLE</h1>
            </div>
            <AppContext.Provider
                value={{
                    board,
                    attempt,
                    word,
                    attemptWordNum
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