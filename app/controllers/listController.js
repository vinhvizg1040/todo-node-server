require("dotenv").config();

const List = require('../models/list');
const Board = require('../models/board');
const User = require('../models/user');

exports.getAllLists = async (req, res) => {
    await List.find({})
        .then(lists => {
            res.status(200).json({
                message: 'Get all boards successfully',
                lists: lists
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        });
};

exports.createList = async (req, res) => {

    try {
        const user_id = req.user.user_id;
        const {
            name,
            board_id
        } = req.body;

        //Checking User having this board_id (feature: checking User can edit this Board)
        const isBoardExists = await User.find({ _id: user_id, boards: board_id }).count() > 0;
        if (!isBoardExists) {
            return res.status(404).json({
                error: 'board not found!'
            });
        }

        const board = await Board.findById(board_id);

        const list = new List({
            name: name
        });

        board.lists.push(list._id);

        const saved = await list.save();

        await board.save();

        res.status(200).json({
            message: 'list added!',
            list: saved
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.deleteListById = async (req, res) => {

    try {
        const user_id = req.user.user_id;
        const {
            board_id,
            list_id,
        } = req.body;

        //Checking User having this board_id (feature: checking User can edit this Board)
        const isBoardExists = await User.find({ _id: user_id, boards: board_id }).count() > 0;
        if (!isBoardExists) {
            return res.status(402).json({
                message: 'can`t edit other user`s board'
            })
        }

        // Checking user's Board having list_id
        const isListExists = await Board.find({ _id: board_id, lists: list_id }).count() > 0;
        if (!isListExists) {
            return res.status(402).json({
                message: 'can`t delete other user`s list'
            })
        }

        // Delete it
        const list = await List.findById(list_id);

        if (!list) {
            return res.status(402).json({
                message: 'list is not found!'
            });
        }

        await Board.updateMany({ 'lists': list_id }, { $pull: { 'lists': list_id } });
        const deleted = await List.deleteOne({ '_id': list_id });

        if (deleted.deletedCount !== 1) {
            return res.status(404).json({ message: 'deleted failed!' })
        }

        res.status(200).json({ list: list })
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// exports.getListByBoard = async (req, res) => {

//     try {
//         
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }
// };

exports.updateListById = async (req, res) => {

    try {
        const user_id = req.user.user_id;
        const {
            name,
            board_id,
            list_id
        } = req.body;

        //Checking User having this board_id (feature: checking User can edit this Board)
        const isBoardExists = await User.find({ _id: user_id, boards: board_id }).count() > 0;
        if (!isBoardExists) {
            return res.status(404).json({
                message: 'board not found!'
            });
        }

        // Checking user's Board having list_id
        const isListExists = await Board.find({ _id: board_id, lists: list_id }).count() > 0;
        if (!isListExists) {
            return res.status(404).json({
                message: 'list not found!'
            });
        }



        const lists = await List.updateOne({ _id: list_id }, { name: name });

        if (lists.modifiedCount !== 1) {
            return res.status(402).json({
                message: 'update failed !!'
            })
        }

        res.status(200).json({
            message: 'list updated!',
            list: lists
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.UpdateListOfCardsPosition = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const {
            listCards
        } = req.body;

        for (const listId in listCards) {
            if (listCards[listId].toString() === "") {
                //donot something
                // console.log("null");
            } else {
                const updated = await List.updateOne({ _id: listId }, { cards: listCards[listId].map(({ _id }) => (_id)) });
                if (updated.modifiedCount !== 1) {
                    return res.status(402).json({
                        message: 'update failed !!'
                    })
                }
            }
        }
        res.status(200).json({
            message: 'list updated!',
            cards: listCards
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}