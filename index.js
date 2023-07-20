const express = require("express")
const dotenv = require("dotenv")
const PORT = 8000
dotenv.config()

const db = require("./models")

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json("This is my APIiii")
})

const { memberRouter, bookRouter, borrowRouter, returnRouter } = require("./routers")
app.use('/books', bookRouter);
app.use('/members', memberRouter);
app.use('/borrows', borrowRouter);
app.use('/returns', returnRouter);

app.listen(PORT, () => {
    // db.sequelize.sync({ alter: true })
    console.log(`Server running at PORT ${PORT}`);
}) 