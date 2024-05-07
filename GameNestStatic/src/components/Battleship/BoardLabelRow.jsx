const BoardLabelRow = () => {

    function drawRow() {
        const letters = [" ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
        return letters.map((letter) => {
            return (
                <div className="col square" key={letter}>{letter}</div>
            );
        });
    }

    return (
        <div className="row row-cols-11 mb-0">
            {drawRow()}
        </div>
    );
}

export default BoardLabelRow;