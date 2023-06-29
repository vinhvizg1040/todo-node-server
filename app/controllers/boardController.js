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
            message: 'board added',
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

        const user = await User.findById(user_id).populate({path: 'boards', select: '_id name'});


        if (!user) {
            return res.status(404).json({
                error: 'user not found!'
            });
        }

        res.status(200).json({ boards: user.boards });
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
        const isExists = await User.find({ _id: user_id, boards: board_id }).count() > 0;

        if (!isExists) {
            return res.status(402).json({
                message: 'can`t delete other user`s board'
            })
        }

        const board = await Board.findById(board_id);

        if (!board) {
            return res.status(402).json({
                message: 'board is not found!'
            });
        }

        await User.updateMany({ 'boards': board_id }, { $pull: { 'boards': board_id } });
        const deleted = await Board.deleteOne({ '_id': board_id });


        if (deleted.deletedCount !== 1) {
            return res.status(404).json({ message: 'deleted failed!' })
        }

        res.status(200).json({ board: board })
    } catch (error) {
        res.status(500).json({
            message: error
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
        const isExists = await User.find({ _id: user_id, boards: board_id }).count() > 0;

        if (!isExists) {
            return res.status(402).json({
                message: 'can`t update other user`s board'
            })
        }

        const board = await Board.updateOne({ _id: board_id }, { name: name });

        if (board.modifiedCount !== 1) {
            return res.status(402).json({
                message: 'update failed !!'
            })
        }

        res.status(200).json('Update Success')
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getBoardbyId = async (req, res) => {

    try {
        const board_id = req.body.board_id;
        const user_id = req.user.user_id;

        //check: user (user_id) have board (board_id) => return true/false
        const isExists = await User.find({ _id: user_id, boards: board_id }).count() > 0;
        
        if (!isExists) {
            return res.status(402).json({
                message: 'can`t use other user`s board'
            })
        }

        const board = await Board.findById(board_id).select(['lists']).populate({ path: 'lists', populate: { path: 'cards', select: '_id name' }, select: '_id name' });

        if (!board) {
            return res.status(402).json({
                message: 'board is not found!'
            });
        }

        res.status(200).json(board)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getFirstBoard = async (req, res) => {

    try {
        // const board_id = req.body.board_id;
        const user_id = req.user.user_id;

        //check: user (user_id) have board (board_id) => return true/false
        const isExists = await User.find({ _id: user_id }).count() > 0;

        if (!isExists) {
            return res.status(402).json({
                message: 'can`t use other user`s board'
            })
        }

        const board = await Board.findOne({}).select(['lists']).populate({path: 'lists', populate: {path: 'cards', select: '_id name'}, select: '_id name'});;
        // .select(['_id'])
        if (!board) {
            return res.status(402).json({
                message: 'board is not found!'
            });
        }


        res.status(200).json(board)
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


exports.updateListOfBoardPosition = async (req, res) => {

    try {
        const user_id = req.user.user_id;

        const { listIds, board_id } = req.body

        //Checking User having this board_id (feature: checking User can edit this Board)
        const isBoardExists = await User.find({ _id: user_id, boards: board_id }).count() > 0;
        if (!isBoardExists) {
            return res.status(404).json({
                message: 'board not found!'
            });
        }

        // // Checking user's Board having list_id
        // const isListExists = await Board.find({ _id: board_id, lists: list_id }).count() > 0;
        // if (!isListExists) {
        //     return res.status(404).json({
        //         error: 'list not found!'
        //     });
        // }

        const updated = await Board.updateOne({ _id: board_id }, { lists: listIds });


        if (updated.modifiedCount !== 1) {
            return res.status(402).json({
                message: 'update failed !!'
            })
        }
        const board = await Board.findById(board_id).select(['lists']).populate({ path: 'lists', populate: { path: 'cards', select: '_id name' }, select: '_id name' });

        if (!board) {
            return res.status(402).json({
                message: 'board is not found!'
            });
        }
        res.status(200).json({
            message: 'board updated!',
            board: board
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};