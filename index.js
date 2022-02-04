require('dotenv').config()
require('./mongo')
const express = require('express')
const cors = require('cors')
const app = express()

const Note = require('./models/Note')
const handleErrors = require('./middleware/handleErrors')
const notFound = require('./middleware/notFound')

app.use(cors())
app.use(express.json())


const NOT_CONTENT = 204
const BAD_REQUEST = 400
const NOT_FOUND = 404

app.get('/', (request, response) => {
	response.send('<h1>Hello world</h1>')
})

app.get('/api/notes', (request, response) => {
	Note.find({}).then((notes) => {
		response.json(notes)
	})
})

app.get('/api/notes/:id', (request, response, next) => {
	const id = request.params.id

	Note.findById(id)
		.then(note => {
			if (!note)
				return response.status(NOT_FOUND).end()
			response.json(note)
		})
		.catch(err => next(err))
})

app.delete('/api/notes/:id', (request, response, next) => {
	const id = request.params.id

	Note.findByIdAndRemove(id)
		.then(() => response.status(NOT_CONTENT).end())
		.catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
	const id = request.params.id
	const body = request.body

	const newNote = {
		content: body.content,
		important: body.important
	}

	Note.findByIdAndUpdate(id, newNote, {new: true})
		.then(result => response.json(result))
		.catch(err => next(err))
})

app.post('/api/notes', (request, response) => {
	const body = request.body

	if (!body || !body.content) 
		return response.status(BAD_REQUEST).json({
			error: 'content is missing'
		})

	const newNote = new Note({
		content: body.content,
		date: new Date(),
		important: body.important || false
	})
	newNote.save()
		.then(savedNote => response.json(savedNote))
})

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT

app.listen(PORT, () => {
	console.log(`Server runnng in port ${PORT}`)
})

