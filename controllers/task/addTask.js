const Task = require("../../models/task.js");
const Template = require('../../models/template');

const addTask = async (req, res) => {
  try {
    const { name, est, notes, project, order, template } = req.body;

    const templateData = req.templateData;

    const newTask = await Task.create({ name, est, notes, project, order, template, userId: req.userId });
    if (template) {
      await Template.findByIdAndUpdate(template?._id, { tasks: [...templateData.tasks, newTask._id], est: templateData.est + est });
    }

    res.status(200).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

module.exports = addTask;
