const Task = require('../model/Task');

const taskController = {}

// 할 일을 추가하는 기능
taskController.createTask = async (req, res) => {
    try{
        const { task, isComplete } = req.body;
        const newTask = new Task({ task, isComplete });
        await newTask.save();
        res.status(200).json({ status:'ok', data: newTask });
    }catch(err){
        res.status(400).json({ status: 'fail', error: err });
    }
};

// 할 일 리스트를 볼 수 있는 기능
taskController.getTask = async (req, res) => {
    try{
        const taskList = await Task.find({}).select("-__v") // 테스크 항목을 다 읽어온다(__v 빼고)
        res.status(200).json({ status: "ok", data: taskList})
    }catch(err){
        res.status(400).json({ status: 'fail', error: err })
    }
}

module.exports = taskController