const Task = require("../../models/task.js");

const checkTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = req.oldTask;

    if (!task.template.todo) {
      return res.status(400).json({ message: "invalid template task" })
    }

    if (task.tasks.length > 0) return res.status(400).json({ message: "This is template not single task" })

    const newTask = Object.assign(task, { check: !task.check, act: !task.check ? task.est : 0 })

    const updatedTask = await Task.findByIdAndUpdate(id, newTask, { new: true });

    if (task?.template?._id && task.template.todo) {
      const templateData = await Task.findById(task.template._id);
      await Task.findByIdAndUpdate(task.template._id, { act: (templateData.act + task.act) });
    }

    res.status(200).json(updatedTask);

  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error)
  }
};

module.exports = checkTask;
