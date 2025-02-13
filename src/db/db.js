const mongoose = require ('mongoose')

require ('dotenv').config() 

const ConnectDb = async () => {
    try {
        await mongoose.connect (process.env.MONGO_URI)
    console.log("Database is connected !")
    }

    catch (error) {
        console.log (err)
        process.exit(1)
    }
}
module.exports = ConnectDb