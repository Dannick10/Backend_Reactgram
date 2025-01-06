require("dotenv").config()

const mongoose = require("mongoose")


const db = process.env.DB;

const connectDB = async () => {
    try {
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("database connectd: " + db)
    } catch (err) {
        console.log("database error: " + err)
        process.exit(1)

    }
}

module.exports = {
    connectDB
}
