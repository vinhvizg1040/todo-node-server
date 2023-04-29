require("dotenv").config();

const Board = require('../models/board');
const User = require('../models/user');

exports.getAllBoards = async (req, res) => {
    await Board.find({})
        .then(boards => {
            res.status(200).json({
                message: 'Get all boards successfully',
                boards: boards
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        });
};

exports.createBoards = async (req, res) => {

    try {
        const {
            name
        } = req.body;

        const user_id = req.user.user_id;

        const user = await User.findById(user_id);

        if (!user) {
            return res.status(404).json({
                error: 'user not found!'
            });
        }

        const board = new Board({
            name: name
        });

        user.boards.push(board._id);

        const updated = await board.save();

        await user.save();

        res.status(200).json({
            message: 'board added!',
            board: updated
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getUserBoards = async (req, res) => {
    try {
        const user_id = req.user.user_id;

        const user = await User.findById(user_id).populate('boards');


        if (!user) {
            return res.status(404).json({
                error: 'user not found!'
            });
        }

        res.status(200).json({boards: user.boards});
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.deleteBoardbyId = async (req, res) => {

    try {
        const board_id = req.body.board_id;
        const user_id = req.user.user_id;

        //check: user (user_id) have board (board_id) => return true/false
        const isExists = await User.find({_id: user_id, boards: board_id}).count() > 0;

        if(!isExists){
            return res.status(402).json({
                error: 'can`t delete other user`s board'
            })
        }

        const board = await Board.findById(board_id);

        if(!board){
            return res.status(402).json({
                error: 'board is not found!'
            });
        }

        await User.updateMany({'boards': board_id}, {$pull: {'boards': board_id}});
        const deleted = await Board.deleteOne({'_id': board_id});

        if(deleted.ok){
            return res.status(404).json({error: 'deleted failed!'})
        }

        res.status(200).json({board: board})
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.updateBoardbyId = async (req, res) => {
    try {
        const {
            board_id,
            name
        } = req.body;
        const user_id = req.user.user_id;

        //check: user (user_id) have board (board_id) => return true/false
        const isExists = await User.find({_id: user_id, boards: board_id}).count() > 0;

        if(!isExists){
            return res.status(402).json({
                error: 'can`t update other user`s board'
            })
        }

        const board = await Board.updateOne({_id: board_id}, {name: name});

        if(board.modifiedCount !== 1){
            return res.status(402).json({
                error: 'update failed !!'
            })
        }

        res.status(200).json('Update Success !!')
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};