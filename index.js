require('./mongo')
const express = require('express')
const cors = require('cors')
const app = express()

//const Note = require('./models/Note')

app.use(cors())
app.use(express.json())


let notes = [
	{
		id: 1,
		content: 'Seguir a midudev',
		date: '2019-05-30T17:30:31.098Z',
		important: true
	},
	{
		id: 2,
		content: 'Ir al gimnasio',
		date: '2020-07-02T14:21:18.098Z',
		important: false
	},
	{
		id: 3,
		content: 'Hacer cursos de fullstack',
		date: '2021-12-09T20:30:31.098Z',
		important: true

	}
]

const STATUS_NOT_FOUND = 404
const STATUS_MISSING_DATA = 400
const STATUS_NOT_CONTENT = 204

app.get('/', (request, response) => {
	response.send('<h1>Hello world</h1>')
})

app.get('/api/notes', (request, response) => {
	response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id)
	const note = notes.find(note => note.id = id)
	if (!note) return response.status(STATUS_NOT_FOUND).end()
	response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id)
	notes = notes.filter(note => note.id != id)
	response.status(STATUS_NOT_CONTENT).end()
})

app.post('/api/notes', (request, response) => {
	const body = request.body

	if (!body || !body.content) 
		return response.status(STATUS_MISSING_DATA).json({
			error: 'content is missing'
		})

	const ids = notes.map(note => note.id)
	const nextId = Math.max(...ids)
	const newNote = {
		id: nextId + 1,
		content: body.content,
		date: new Date().toISOString(),
		important: typeof body.important != 'undefined' 
			? body.important
			: false
	}
	notes = [...notes, newNote]
	response.json(newNote)
})

const PORT = process.env.PORT

app.listen(PORT, () => {
	console.log(`Server runnng in port ${PORT}`)
})

