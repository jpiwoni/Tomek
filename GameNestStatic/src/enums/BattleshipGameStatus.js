const BattleshipGameStatus = {
    SETUP: 'SETUP',
    PLAYING: 'PLAYING',
    GAME_OVER: 'GAME_OVER'
};

function stringToState(state) {
    switch (state) {
        case 'SETUP':
            return BattleshipGameStatus.SETUP;
        case 'PLAYING':
            return BattleshipGameStatus.PLAYING;
        case 'GAME_OVER':
            return BattleshipGameStatus.GAME_OVER;
        default:
            return null;
    }
}

export default BattleshipGameStatus;
export { stringToState };

