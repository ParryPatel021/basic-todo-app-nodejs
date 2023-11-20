const express = require("express")
const port = 5000

const connectDB = require("./config/db")

const { errorHandler } = require("./backend/middleware/errorMiddleware")
connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/todos', require("./backend/routes/todoRoutes"))


app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})