const Game = require('../models/Game');

// @desc Get all games
// @route GET api/v1/games
// @access Public
exports.getAllGames = async (req, res, next) => {
    try {
        const games = await Game.find();

        return res.status(200).json({
            success: true,
            count: games.length,
            data: games
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "Server Error"
        });
    }
}

// @desc Add game
// @route POST api/v1/games
// @access Public
exports.addGame = async (req, res, next) => {
    const { content, title, ingredients } = req.body;

    try {
        const game = await Game.create({
            content, title, ingredients
        });

        return res.status(201).json({
            success: true,
            data: game
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
            });
        }
        return res.status(500).json({
            success: false,
            error: "Server Error"
        });
    }
}

// @desc Delete game
// @route DELETE api/v1/games/:id
// @access Public
exports.deleteGame = async (req, res, next) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({
                success: false,
                error: 'No game found'
            });
        }

        await game.remove();
        return res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "Server Error"
        });
    }
}

// @desc Get single games
// @route GET api/v1/games
// @access Public
exports.getSingleGame = async (req, res, next) => {
    try {
        const game = await Game.findById(req.params.id);

        return res.status(200).json({
            success: true,
            data: game
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "Server Error"
        });
    }
}