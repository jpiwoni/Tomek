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

        if (state === "hit") {
            classes += " hit";
        } else if (state === "miss") {
            classes += " miss";
        } else if (state === "sunk") {
            classes += " sunk";
        } else if (state === "highlighted") {
            classes += " highlighted";
        }

        if (highlighted) {
            classes += " highlighted";
        }

        return classes;
    }

    return (
        <div className={getClasses()} onClick={onClick} onMouseOver={_onMouseOver} onMouseOut={_onMouseOut}>{value}</div>
    );
}

export default Square;