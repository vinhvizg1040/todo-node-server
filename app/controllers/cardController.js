require("dotenv").config();

const List = require('../models/list');
const Card = require('../models/card');
const User = require('../models/user');
const Board = require('../models/board');

exports.getAllCards = async (req, res) => {
    await Card.find({})
        .then(cards => {
            res.status(200).json({
                message: 'Get all cards successfully',
                cards: cards
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        });
};

exports.createCard = async (req, res) => {

    try {
        const {
            name,
            list_id,
            board_id
        } = req.body;
        
        const user_id = req.user.user_id;

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
        
        const list = await List.findById(list_id);

        const card = new Card({
            name: name
        });

        list.cards.push(card._id);

        const updated = await card.save();

        await list.save();

        res.status(200).json({
            message: 'Card added!',
            card: updated
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.deleteCardById = async (req, res) => {

    try {
        // const card_id = req.body.card_id;
        // const user_id = req.user.user_id;

        // //check: user (user_id) have card (card) => return true/false
        // const isExists = await User.find({_id: user_id, cards: card_id}).count() > 0;

        // if(!isExists){
        //     return res.status(402).json({
        //         error: 'can`t delete other user`s card'
        //     })
        // }

        // const list = await List.findById(card_id);

        // if(!list){
        //     return res.status(402).json({
        //         error: 'list is not found!'
        //     });
        // }

        // await User.updateMany({'lists': list_id}, {$pull: {'boards': board_id}});
        // const deleted = await Board.deleteOne({'_id': board_id});

        // if(deleted.ok){
        //     return res.status(404).json({error: 'deleted failed!'})
        // }

        // res.status(200).json({board: board})
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
