import React from 'react';

const Square = ({ value, onClick, state, onMouseOver, onMouseOut }) => {
    const [highlighted, setHighlighted] = React.useState(false);


    function _onMouseOver() {
        setHighlighted(true);
        if (onMouseOver) {
            onMouseOver();
        }
    }

    function _onMouseOut() {
        setHighlighted(false);
        if (onMouseOut) {
            onMouseOut();
        }
    }

    function getClasses() {
        let classes = "col square";

        if (state === "sunk") {
            classes += " sunk";
        } else if (state === "hit sunk") {
            classes += " sunk";
        } else if (state === "highlighted") {
            classes += " highlighted";
        }

        if (highlighted) {
            classes += " highlighted";
        }

        return classes;
    }

    function getImage() {
        if (state === "hit sunk" || state === "hit") {
            return <img src="/img/battleship/hit.png" className={"w-100"} alt="hit battleship" />
        } else if (state === "miss") {
            return <img src="/img/battleship/miss.png" className={"w-100"} alt="missed battleship" />
        }
        return null
    }

    return (
        <div className={getClasses()} onClick={onClick} onMouseOver={_onMouseOver} onMouseOut={_onMouseOut}>{getImage()}</div>
    );
}

export default Square;