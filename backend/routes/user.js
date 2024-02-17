const { Router } = require("express")
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Todos } = require("../db/index");
const jwt = require("jsonwebtoken");
const { createTodo, updateTodo, login } = require("../types");
const jwtPassword = process.env.jwtPassword;




// NOTE:-   /signup and /login both routes should have password encryption logic.

router.post('/signup', async (req, res) => {
    try {
        const creatPayload = req.body;
        const parsedPayload = login.safeParse(creatPayload);
        if (!parsedPayload.success) {
            res.status(411).json({
                msg: "Invalid inputes."
            });
            return;
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            res.json({ msg: "User alrady exist." });
            return;
        }

        await User.create({ email, password });
        res.json({ msg: "User created successfully." });

    } catch (err) {
        res.status(500).json({ msg: "Internal server error in signup." });
    }
});

router.post('/login', async (req, res) => {
    try {
        const creatPayload = req.body;
        const parsedPayload = login.safeParse(creatPayload);
        if (!parsedPayload.success) {
            res.status(411).json({
                msg: "Invalid inputes."
            });
            return;
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (user) {
            const token = jwt.sign({ email }, jwtPassword);
            res.json({ token });
            return;
        }
        res.json({ msg: "Invalid email or password." });

        return;

    } catch (err) {
        res.status(500).json({ msg: "Internal server error in login." });
    }
});

router.get('/todo', userMiddleware, async (req, res) => {
    try {
        const email = req.email;

        const user = await User.findOne({ email });

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

        const email = req.email;
        const { title, description } = req.body;

        const todo = await Todos.create({ title, description });

        const user = await User.updateOne({ email }, {
            $push: { todoList: todo.id }
        });
        if(user.modifiedCount){
            res.json({
                _id: todo.id
            });
        }
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error creating todo' });
    }
});

router.post('/completed', userMiddleware, async (req, res) => {
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
        
        const email = req.email;
        const { id } = req.body;

        const todo = await Todos.findOne({ _id: id });

        if (todo) {
            await Todos.deleteOne({ _id: id });

            await User.updateOne({ email }, {
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