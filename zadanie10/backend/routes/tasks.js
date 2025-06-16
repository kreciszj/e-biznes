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
  const id = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== id);
  res.status(204).end(); 
});


module.exports = router;
