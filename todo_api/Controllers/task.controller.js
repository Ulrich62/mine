const Task = require("../Models/task.model");

exports.createTask = (req, res, next) => {
  console.log(req.body);

  const task = new Task({
    ...req.body,
  });
  task
    .save()
    .then(() => res.status(201).json({ message: "Task registered" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getById = (req, res, next) => {
  Task.findOne({ _id: req.params.id })
    .then((task) => res.status(200).json(task))
    .catch((error) => res.status(400).json({ error }));
};

exports.getByUserId = (req, res, next) => {
  Task.find({ userId: req.params.id })
    .then((tasks) => res.status(200).json(tasks))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllTask = (req, res, next) => {
  Task.find()
    .then((tasks) => res.status(200).json(tasks))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteTask = (req, res, next) => {
  // return res.json(req.params.id);
  Task.findOne({ _id: req.params.id }).then((task) => {
    // return res.json(task);
    if (!task) {
      res.status(404).json({
        error: new Error("No such Task!"),
      });
    }
    // return res.json(task.userId)
    else {
      Task.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(200).json({
            message: "Deleted!",
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
    }
  });
};

exports.updateTask = (req, res, next) => {
  Task.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(201).json({ message: "Task updated" }))
    .catch((error) => res.status(400).json({ error }));
};
