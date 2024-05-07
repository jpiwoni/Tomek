import React, { useContext, useEffect } from "react";
import { AppContext } from "../WordleGame";

function Letter({ pos, wordNum }) {
  const { board, attempt, word } =
    useContext(AppContext);

  return (
    <div className="letter">
      
    </div>
  );
}

export default Letter;