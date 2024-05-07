import Square from "./Square";

const BoardRow = ({ row, rowIndex, onClick, onMouseOver, onMouseOut }) => {

    function drawRow() {
        return row.map((cell, cellIndex) => {
            return (
                <Square key={rowIndex + " " + cellIndex} state={cell} onClick={() => onClick(rowIndex, cellIndex)} onMouseOver={() => onMouseOver(rowIndex, cellIndex)} />
            );
        });
    }

    return (
        <div className="row row-cols-11 m-0">
            <div className="col square">{rowIndex + 1}</div>
            {drawRow()}
        </div>
    );
}

export default BoardRow;