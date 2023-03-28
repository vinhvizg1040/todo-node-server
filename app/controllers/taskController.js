const Task = require('../models/task');
const User = require('../models/user');

exports.getUserTasks = async (req, res) => {
    try {
        // Lấy userId từ params
        const {
            userId
        } = req.body;

        // Tìm tất cả các công việc (tasks) đã được phân công cho userId
        const userTasks = await User.findByPk(userId, {
            include: [{
                model: Task,
                attributes: ['id', 'title', 'description', 'endDate', 'createDate', 'status']
            }]
        });

        // Trả về danh sách các công việc
        res.status(200).json({
            tasks: userTasks.tasks
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};

exports.createTask = async (req, res) => {
    try {
        // Lấy thông tin người dùng từ request
        const {
            username,
            title,
            description,
            endDate
        } = req.body;

        // Tìm người dùng theo username
        const user = await User.findOne({
            where: {
                username
            }
        });

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Tạo mới một công việc (task) cho người dùng
        const task = await Task.create({
            title,
            description,
            endDate,
            createDate: Date.now(),
            status: 'pending'
        });

        // Gán công việc vừa tạo cho người dùng bằng cách tạo một bản ghi trong bảng trung gian UserTasks
        await user.addTask(task);

        // Trả về thông tin của công việc đã được tạo
        res.status(201).json({
            task
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};

exports.updateTask = async (req, res) => {
    try {
        // Lấy thông tin task từ request
        const {
            id,
            title,
            description,
            endDate,
            status
        } = req.body;

        // Tìm công việc cần sửa đổi
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        // Sửa đổi các trường của công việc
        task.title = title;
        task.description = description;
        task.endDate = endDate;
        task.status = status;

        // Lưu lại thông tin của công việc sau khi đã được sửa đổi
        await task.save();

        // Trả về thông tin của công việc đã được sửa đổi
        res.status(200).json({
            task
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        // Lấy thông tin task từ request
        const {
            id
        } = req.body;

        // Tìm công việc cần xoá
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            });
        }

        // Xoá công việc
        await task.destroy();

        // Trả về thông báo thành công
        res.status(200).json({
            message: 'Task deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};