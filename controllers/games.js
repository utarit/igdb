// @desc Get all games
// @route GET api/v1/games
// @access Public

exports.getGames = (req, res, next) => {
    res.send('GET Games');
}

// @desc Add game
// @route POST api/v1/games
// @access Public

exports.addGame = (req, res, next) => {
    res.send('POST Games');
}

// @desc Delete game
// @route DELETE api/v1/games/:id
// @access Public

exports.deleteGame = (req, res, next) => {
    res.send('DELETE Game');
}