const mysql = require('../../config/mysqldb');
const lists = require('../../config/mongodb')
require("dotenv").config();

// const List = mysql.list;

// async function insert() {
//     const doc = {

//         title: "Record of a Shriveled Datum",

//         content: "No bytes, no problem. Just insert a document, in MongoDB",

//     }

//     const result = await lists.create(doc);
// }

// insert();

// exports.getAllLists = async (req, res) => {
//     await List.findAll()
//         .then(lists => {
//             res.status(200).json({
//                 message: 'Get all users successfully',
//                 lists: lists
//             });
//         })
//         .catch(error => {
//             res.status(500).json({
//                 message: 'Internal server error',
//                 error: error
//             });
//         });
// };

// exports.createList = async (req, res) => {

//     try {
//         const {
//             name,
//             board_id
//         } = req.body;

//         const user_id = req.user.user_id;

//         if (name !== null) {
//             List.create({
//                 name,
//                 user_id,
//                 board_id
//             }).then(list => {
//                 res.status(200).json(list);
//             });
//         }

//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }
// };


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