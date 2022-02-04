require('dotenv').config()
const mongoose = require('mongoose')
const connectionString = process.env.DB_URL

mongoose.connect(connectionString)
	.then(() => {
		console.log('Database connected')
	}).catch((err) => {
		console.log(err)
	})


/*
const note = new Note({
	content: 'Aprendiendo Mongo',
	date: new Date(),
	important: true
})

note.save()
	.then((result) => {
		console.log(result)
		mongoose.connection.close()
	})
	.catch(err => {
		console.log(err)
	})
    */