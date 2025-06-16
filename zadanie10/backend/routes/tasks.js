const express = require('express');
const { v4: uuid } = require('uuid');
const router = express.Router();

let tasks = [];

router.get('/', (_req, res) => res.json(tasks));

router.post('/', (req, res) => {
  const task = { id: uuid(), title: req.body.title };
  tasks.push(task);
  res.status(201).json(task);
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const initialLength = tasks.length;
  tasks = tasks.filter((task) => task.id !== id);
  
  if (tasks.length === initialLength) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(204).end();
});



module.exports = router;
