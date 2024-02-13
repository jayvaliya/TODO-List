const { Router } = require("express")
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Todos } = require("../db/index");
const jwt = require("jsonwebtoken");
const { createTodo, updateTodo, login } = require("../types");
const jwtPassword = process.env.jwtPassword;


router.post('/signup', async (req, res) => {
    try {

        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (user) {
            res.json({ msg: "User alrady exist." });
        }

        await User.create({ username, password });
        res.json({ msg: "User created successfully." });

    } catch (err) {
        res.status(500).json({ msg: "Internal server error in signup." });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.find({ username, password });

        if (!user) {
            return res.json({ msg: "Invalid username or password." });
        }

        const token = jwt.sign({ username }, jwtPassword);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ msg: "Internal server error in sighin." });
    }
});

router.get('/todo', userMiddleware, async (req, res) => {
    try {
        const username = req.username;

        const user = await User.findOne({ username });

        const todos = await Todos.find({
            _id: {
                "$in": user.todoList
            }
        });

        res.send({ todos });

    } catch (error) {
        console.error('Error getting Todos:', error);
        res.status(500).json({ msg: 'Internal Server Error in getting todo' });
    }
});

router.post('/todo', userMiddleware, async (req, res) => {
    try {

        // form validation using zod
        const creatPayload = req.body;
        const parsedPayload = createTodo.safeParse(creatPayload);
        if (!parsedPayload.success) {
            res.status(411).json({
                msg: "Invalid inputes."
            });
            return;
        }


        const username = req.username;
        const { title, description } = req.body;

        const todo = await Todos.create({ title, description });

        const user = await User.updateOne({ username }, {
            $push: { todoList: todo.id }
        });

        res.json({
            _id: todo.id
        });

    } catch (error) {
        console.error('Error adding Todo:', error);
        res.status(500).json({ msg: 'Internal Server Error creating todo' });
    }
});

router.post('/completed', userMiddleware, async (req, res) => {
    // body: {_id}
    try {
        const creatPayload = req.body;
        const parsedPayload = updateTodo.safeParse(creatPayload);
        if (!parsedPayload.success) {
            res.status(411).json({
                msg: "Invalid inputes."
            });
            return;
        }

        const { id } = req.body;

        const todo = await Todos.findOne({ _id: id });

        const result = await Todos.updateOne({ _id: id }, {
            '$set': { done: !todo.done }
        });

        res.json({
            msg: "Updated successfully."
        });

    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error in editing todo" });
    }

});

router.post('/delete', userMiddleware, async (req, res) => {
    try {
        const creatPayload = req.body;
        const parsedPayload = updateTodo.safeParse(creatPayload);
        if (!parsedPayload.success) {
            res.status(411).json({
                msg: "Invalid inputes."
            });
            return;
        }
        
        const username = req.username;
        const { id } = req.body;

        const todo = await Todos.findOne({ _id: id });

        if (todo) {
            await Todos.deleteOne({ _id: id });

            await User.updateOne({ username }, {
                '$pull': { todoList: id }
            });
        } else {
            res.json({ msg: "Todo not found." });
        }
        res.json({ msg: "Deleted successfully." });

    } catch (err) {
        res.status(500).json({
            msg: "Internal server error while deleting todo"
        });
    }
});

module.exports = router;