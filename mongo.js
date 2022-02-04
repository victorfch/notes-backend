require('dotenv').config()
const mongoose = require('mongoose')
const connectionString = process.env.DB_URL

mongoose.connect(connectionString)
	.then(() => console.log('Database connected'))
	.catch((err) => console.log(err))

process.on('uncaughtException', () => {
	mongoose.connection.disconnect()
})