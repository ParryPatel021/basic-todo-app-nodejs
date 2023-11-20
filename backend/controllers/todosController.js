const asyncHandler = require("express-async-handler")
// Model
const Todo = require("../models/todoModel")

const { ObjectId } = require("mongodb")

const getTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find()
    res.status(200).json(todos)
})

const setTodos = asyncHandler(async (req, res) => {

    if (!req.body.text) {
        res.status(400)
        throw new Error("Please add text field")
    }

    const todo = await Todo.create({
        text: req.body.text
    })

    res.status(200).json(todo)
})

const updateTodos = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id)

    if (!todo) {
        res.status(400)
        throw new Error("Todo not found")
    }

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedTodo)
})

const deleteTodos = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id)

    if (!todo) {
        res.status(400)
        throw new Error("Todo not found")
    }

    const deletedTodo = await Todo.deleteOne({ _id: new ObjectId(todo.id) })

    if (deletedTodo.deletedCount == 1) {
        res.status(200).json({ message: `Todo ${todo.id} is deleted` })
    } else {
        res.status(400).json({ message: `Todo ${todo.id} is might be deleted earlier.` })
    }
})

module.exports = {
    getTodos, setTodos, updateTodos, deleteTodos
}