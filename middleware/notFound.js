const NOT_FOUND = 404

module.exports = (request, response) => {
	response.status(NOT_FOUND).end()
}