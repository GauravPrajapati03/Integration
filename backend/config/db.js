const mongoose = require('mongoose')

const connectToDB = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        .then((res) => console.log(`MongoDB connected to ${res.connection.host}`))
    } catch (error) {
        console.log(`Error Connecting to DB`, error)
    }
}

module.exports = connectToDB;