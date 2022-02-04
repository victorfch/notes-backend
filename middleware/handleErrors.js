const BAD_REQUEST = 400
const INTERNAL_SERVER_ERROR = 500

module.exports = (error, request, response, next) => {
	console.log(error.name)
	if (error.name === 'CastError') {
		response.status(BAD_REQUEST).send({
			error: 'id used is malformed'
		})
	} else {
		response.status(INTERNAL_SERVER_ERROR).end()
	}
}