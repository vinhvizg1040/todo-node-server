require("dotenv").config();

const List = require('../models/list');
const Board = require('../models/board');
const Card = require('../models/card');

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
        const {
            name,
            board_id
        } = req.body;
        
        const board = await Board.findById(board_id);

        if (!board) {
            return res.status(404).json({
                error: 'board not found!'
            });
        }

        const list = new List({
            name: name
        });

        board.lists.push(list._id);

        const updated = await list.save();

        await board.save();

        res.status(200).json({
            message: 'list added!',
            list: updated
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.deleteListById = async (req, res) => {

    try {
        const list_id = req.body.list_id;
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

// exports.getUserList = async (req, res) => {

//     try {
//         const user_id = req.user.user_id;

//         List.findAll({
//                 where: {
//                     user_id: user_id
//                 }
//             })
//             .then(list => {
//                 if (list) {
//                     //nếu list tồn tại 
//                     return list;
//                 } else {
//                     // Xử lý lỗi: không tìm thấy
//                     res.status(400).json({
//                         error: "List not found"
//                     });
//                 }
//             })
//             .then(list => {
//                 res.status(200).json({
//                     list
//                 }); // In ra thông tin của bảng mới được tạo
//             })
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }
// };

// exports.deleteListbyId = async (req, res) => {

//     try {
//         const list_id = req.body.list_id;
//         const user_id = req.user.user_id;

//         List.finmysqlyPk(list_id)
//             .then(list => {
//                 if (list) {
//                     //nếu board tồn tại, kiểm tra user_id (FK)
//                     if (list.user_id === user_id) {

//                         return List.destroy({
//                             where: {
//                                 list_id: list_id
//                             }
//                         });
//                     } else {
//                         res.status(400).json({
//                             error: "Cannot delete other user's list"
//                         });
//                     }
//                 } else {
//                     // Xử lý lỗi: không tìm thấy người dùng
//                     res.status(400).json({
//                         error: "List not found"
//                     });
//                 }
//             })
//             .then(list => {
//                 if (list) {
//                     res.status(200).json("Delete success");
//                 }
//             })
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }
// };

// exports.updateListbyId = async (req, res) => {

//     try {
//         const {
//             list_id,
//             name
//         } = req.body;
//         const user_id = req.user.user_id;

//         List.finmysqlyPk(list_id)
//             .then(list => {
//                 if (list) {
//                     //nếu board tồn tại, kiểm tra user_id (FK)
//                     if (list.user_id === user_id) {

//                         return List.update({
//                             name: name
//                         }, {
//                             where: {
//                                 list_id: list_id
//                             }
//                         });
//                     } else {
//                         res.status(400).json({
//                             error: "Cannot rename other user's board"
//                         });
//                     }
//                 } else {
//                     // Xử lý lỗi: không tìm thấy
//                     res.status(400).json({
//                         error: "Board not found"
//                     });
//                 }
//             })
//             .then(list => {
//                 if (list) {
//                     res.status(200).json("Success");
//                 }
//             })
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }
// };