const Task = require('../model/Task');

const taskController = {}

// 할 일을 추가하는 기능
taskController.createTask = async (req, res) => {
    try{
        const { task, isComplete } = req.body;
        const { userId } = req;
        const newTask = new Task({ task, isComplete, author : userId });
        await newTask.save();
        res.status(200).json({ status:'ok', data: newTask });
    }catch(err){
        res.status(400).json({ status: 'fail', error: err });
    }
};

// 할 일 리스트를 볼 수 있는 기능
taskController.getTask = async (req, res) => {
    try{
        const taskList = await Task.find({}).select("-__v").populate("author"); // 테스크 항목을 다 읽어온다(__v 빼고)
        res.status(200).json({ status: "ok", data: taskList})
    }catch(err){
        res.status(400).json({ status: 'fail', error: err })
    }
}

// 할 일에 대해 끝남, 안끝남 표시를 하는 기능
taskController.updateTask = async(req, res) => {
    try{
        const task = await Task.findById(req.params.id);
        if(!task){
            throw new Error("App can not find the task");
        }
        const fields = Object.keys(req.body);
        fields.map((item) => (task[item] = req.body[item]));
        await task.save();
        res.status(200).json({ status: "ok", data: task })
    }catch(err){
        res.status(400).json({ status: 'fail', error: err })
    }
}

// 할 일을 삭제하는 기능
taskController.deleteTask = async(req, res) => {
    try{
        const deleteItem = await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: "ok", data: deleteItem })
    }catch(err){
        res.status(400).json({ status: 'fail', error: err })
    }
}

module.exports = taskController