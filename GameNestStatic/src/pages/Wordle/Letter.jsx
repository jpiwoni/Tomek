import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../WordleGame";


function Letter({ pos, wordNum }) {
  const { board, attempt, word } = useContext(AppContext)

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
  var letterState = ''
    

 

  useEffect(() => { 
    console.log("reached board update", letter)
    
  //console.log(letter, wordNum, pos, letterState)
   }, []);
 
    
  return (
    <div className="letter" id={letterState}>{letter}</div>
  );
}

export default Letter;