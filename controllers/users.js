const User = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { check, validationResult } = require("express-validator");


// @desc Sign Up
// @route POST api/v1/signup
// @access Private

exports.signUpValidation = [
    check("username", "Please Enter a Valid Username")
        .not()
        .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
        min: 6
    })
];


exports.signUp = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({
            email
        });
        if (user) {
            return res.status(400).json({
                success: false,
                msg: "User Email Already Exists"
            });
        }
        user = await User.findOne({
            username
        });
        if (user) {
            return res.status(400).json({
                success: false,
                msg: "Username Already Exists"
            });
        }
        user = new User({
            username,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            "randomString", {
            expiresIn: 10000
        },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    success: true,
                    data: token
                });
            }
        );
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            success: false,
            error: "Server Error"
        });
    }
}


exports.loginValidation = [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
        min: 6
    })
];

// @desc Login
// @route POST api/v1/login
// @access Private
exports.login = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: errors.array()
        });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({
            email
        });
        if (!user)
            return res.status(400).json({
                success: false,
                error: "User Not Exist"
            });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({
                success: false,
                error: "Incorrect Password!"
            });

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            "secret",
            {
                expiresIn: 3600
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    success: true,
                    data: token
                });
            }
        );
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

exports.getUser = async (req, res, next) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            user
        });
    } catch (e) {
        res.status(500).send({
            success: false,
            error: "Error in Fetching user"
        });
    }
}

exports.getAllUsers = async (req, res, next) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        const users = await User.find();
        res.json({
            success: true,
            data: users.map((entry) => ({username: entry.username, email:entry.email}))
        });
    } catch (e) {
        res.send({
            success: false,
            error: "Error in Fetching user"
        });
    }
}