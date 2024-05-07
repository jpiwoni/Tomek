// Router for dotsAndBoxes game

const express = require('express');
const router = express.Router();

router.get('/dotsAndBoxes/:gameId', (req, res) => {
    res.send('dotsAndBoxes game');
});

router.get('/dotsAndBoxes/:gameId/shoot', (req, res) => {
    // Get the query string from the URL
    let query = req.query;
    let x = query.x;
    let y = query.y;
    let gameId = req.params.gameId;
    res.send(`Color at ${x}, ${y} in game ${gameId}`);
});

module.exports = router;