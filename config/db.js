const mongoose = require("mongoose")
require("dotenv").config()

const {MONGODB_URI} = process.env

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URI)
        console.log(`Mongo db connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB