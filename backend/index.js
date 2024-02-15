require('dotenv').config()

const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const port=process.env.PORT || 3000;
const cors=require('cors');

app.use(express.json()); //To access body of request.
app.use(cors({
    origin: "http://localhost:5173"
}));


app.use("/user", userRouter);


app.all('*', (req, res) => {
    res.status(404).json({ msg: 'Not Found :<' });
});

app.listen(port , () => {
    console.log("Server is running on port", port);
});
