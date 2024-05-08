import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../WordleGame";

function Letter({ pos, wordNum }) {
  const { board, attempt, word, attemptWordNum } = useContext(AppContext)

  //const letter = board[wordNum][pos]
  //var letter = board[wordNum][pos]

  /*
  async function handleKeyDown(event) {
    if (wordNum == attempt.word && pos == attempt.letter) {
      letter = board[wordNum][pos]
    }
  }
  */
  const letter = board[wordNum][pos] 
  const letterState = getState(letter.toLowerCase(), pos, word, wordNum, attempt)

  
  async function handleEnter(event) {
    const input = event.key
    if (input === 'Enter') {    // user submits word
        //console.log(attemptWordNum)
        
      } 
    }

 

  useEffect(() => { 
    document.addEventListener('keydown', handleEnter);
   }, []);
 
    
  return (
    <div className="letter" id={letterState}>{letter}</div>
  );
}

function getState(letter, pos, word, wordNum, attempt) {
  if (letter != '') {
    if (letter === word[pos]) {
      return 'correct'
    } else if (word.includes(letter)) {
      return 'different-spot'
    } else {
      return 'wrong'
    } 
  } else {
    return ''
  } 
}

export default Letter;