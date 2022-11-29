const getUserId = require('./firebase').getUserId

const isAuthorized = async (request) => {
  return await getUserId(request.headers['authorization']);
}

const send401 = (response) => {
  response.status(401).json({'error': 'unauthorized'})
}

const send400 = (response) => {
  response.status(400).json({'error': 'bad request'})
}

module.exports = {
  isAuthorized,
  send401,
  send400
}