const Pool = require('pg').Pool
const generateId = require('./generator').generateId
const { isAuthorized, send401, send400 } = require('./util')
require('dotenv').config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const getTexts = (request, response) => {
    const userId = isAuthorized(request);
    if (userId === null) {
        send401(response);
        return
    }
    pool.query('SELECT * FROM texts WHERE user_id = $1 ORDER BY id ASC', [userId], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({'data': results.rows})
    })
}

const getTextById = (request, response) => {
    const id = request.query.id;
    if (id === undefined) {
        send400(response);
        return
    }
    pool.query('SELECT * FROM texts WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json({'data': results.rows[0]})
    })
}

const createText = async (request, response) => {
    const text = request.body["text"];
    const decoded = await isAuthorized(request);
    const userId = await decoded.uid;

    const id = userId ? request.body["id"] : generateId(10);
    if (id == null) {
        send400(response);
        return
    }

    pool.query('INSERT INTO texts (id, user_id, text) VALUES ($1, $2, $3)', [id, userId, text],
    (error) => {
        if (error) {
            throw error;
        }
        response.status(200).json({'id': id})
    })
}

module.exports = {
    getTexts,
    getTextById,
    createText
}
