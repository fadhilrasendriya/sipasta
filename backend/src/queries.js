const Pool = require('pg').Pool
const generateId = require('./generator').generateId
const getUserId = require('./firebase').getUserId
require('dotenv').config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const getTexts = (request, response) => {
    const userId = getUserId(request.headers['authorization']);
    if (userId === null) {
        response.status(401).json({'error': 'unauthorized'})
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
    const userId = getUserId(request.headers['authorization']);
    if (userId === null) {
        response.status(401).json({'error': 'unauthorized'})
        return
    }
    pool.query('SELECT * FROM texts WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json({'data': results.rows[0]})
    })
}

const createText = (request, response) => {
    const userId = getUserId(request.headers['authorization']);
    if (userId === null) {
        response.status(401).json({'error': 'unauthorized'})
        return
    }
    const id = generateId(10);

    pool.query('INSERT INTO texts (id, user_id, text) VALUES ($1, $2, $3)', [id, userId, ''],
    (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json({'id': id})
    })
}

const saveText = (request, response) => {
    var id = request.body["id"];
    const userId = getUserId(request.headers['authorization']);
    const text = request.body["text"];

    if (userId === null) {
        response.status(401).json({'error': 'unauthorized'})
        return
    }

    if (id) {
        pool.query('SELECT * FROM texts WHERE id = $1', [id], (error, results) => {
            if (error) {
                throw error;
            } else if (results.rows.length == 0){
                response.status(404).json({'error': 'Not found'})
                return
            } else if (results.rows[0].user_id != userId) {
                response.status(403).json({'error': 'forbidden'})
                return
            }
            pool.query('UPDATE texts SET text = $3 WHERE id = $1 AND user_id = $2', [id, userId, text], (error, results) => {
                if (error) {
                    throw error;
                }
                response.status(200).json({'id': id})
            })
        }) 
    } else {
        response.status(400).json({'error': 'bad request'})
    }
    
}

module.exports = {
    getTexts,
    getTextById,
    createText,
    saveText
}
