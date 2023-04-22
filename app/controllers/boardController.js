const db = require('../../config/mysqldb');;
require("dotenv").config();

const User = db.user;
const Board = db.board;

exports.getAllBoards = async (req, res) => {
    await Board.findAll()
        .then(boards => {
            res.status(200).json({
                message: 'Get all users successfully',
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

        User.findByPk(user_id)
            .then(user => {
                if (user) {
                    // Gọi phương thức createBoard() chỉ khi user tồn tại
                    return user.createBoard({
                        name: name
                    });
                } else {
                    // Xử lý lỗi: không tìm thấy người dùng
                    res.status(402).json('User not found');
                }
            })
            .then(board => {
                res.status(200).json({
                    board
                }); // In ra thông tin của bảng mới được tạo
            })
            .catch(error => {
                res.status(500).json(error);
            });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getUserBoards = async (req, res) => {

    try {
        const user_id = req.user.user_id;

        Board.findAll({
                where: {
                    user_id: user_id
                }
            })
            .then(board => {
                if (board) {
                    //nếu board tồn tại 
                    return board;
                } else {
                    // Xử lý lỗi: không tìm thấy người dùng
                    res.status(400).json({
                        error: "Board not found"
                    });
                }
            })
            .then(board => {
                res.status(200).json({
                    board
                }); // In ra thông tin của bảng mới được tạo
            })
            .catch(error => {
                res.status(500).json(error);
            });
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

        Board.findByPk(board_id)
            .then(board => {
                if (board) {
                    //nếu board tồn tại, kiểm tra user_id (FK)
                    if (board.user_id === user_id) {

                        return Board.destroy({
                            where: {
                                board_id: board_id
                            }
                        });
                    } else {
                        res.status(400).json({
                            error: "Cannot delete other user's board"
                        });
                    }
                } else {
                    // Xử lý lỗi: không tìm thấy người dùng
                    res.status(400).json({
                        error: "Board not found"
                    });
                }
            })
            .then(board => {
                if (board) {
                    res.status(200).json("Delete success");
                }
            })
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

        Board.findByPk(board_id)
            .then(board => {
                if (board) {
                    //nếu board tồn tại, kiểm tra user_id (FK)
                    if (board.user_id === user_id) {

                        return Board.update({
                            name: name
                        }, {
                            where: {
                                board_id: board_id
                            }
                        });
                    } else {
                        res.status(400).json({
                            error: "Cannot rename other user's board"
                        });
                    }
                } else {
                    // Xử lý lỗi: không tìm thấy
                    res.status(400).json({
                        error: "Board not found"
                    });
                }
            })
            .then(board => {
                if (board) {
                    res.status(200).json("Success");
                }
            })
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};