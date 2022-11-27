const Pool = require('pg').Pool
const generateId = require('./generator').generateId
const getUserId = require('./firebase').getUserId

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: 5432,
})

const getTexts = (request, response) => {
    const userId = getUserId(request.headers['authorization']);
    if (userId === null) {
        response.status(401)
        return
    }
    pool.query('SELECT * FROM texts WHERE userId = $1 ORDER BY id ASC', [userId], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getTextById = (request, response) => {
    const userId = getUserId(request.headers['authorization']);
    if (userId === null) {
        response.status(401)
        return
    }
    pool.query('SELECT * FROM texts WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows[0])
    })
}

const saveText = (request, response) => {
    const id = request.body.get("id");
    const userId = getUserId(request.headers['authorization']);
    const text = request.body.get("text");

    if (userId === null) {
        response.status(401)
        return
    }

    if (!(id && checkId(id))) {
        id = generateId(10);
        while(checkId(id)) {
            id = generateId(10);
        }
    } else {
        pool.query('SELECT * FROM texts WHERE id = $1', [id], (error, results) => {
            if (error) {
                throw error;
            } else if (results.rows[0].userId != userId) {
                response.status(403)
                return
            }
        })
    }

    pool.query('INSERT INTO texts (id, userId, text) VALUES ($1, $2, $3) ON CONFLICT (id) DO UPDATE' [id, userId, text],
    (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200)
    })
}

const checkId = (id) => {
    pool.query('SELECT EXISTS (SELECT 1 FROM texts WHERE id = $1)', [id],
    (error, results) => {
        if (error) {
            throw error;
        }
        return results.rows[0]
    })
}

module.exports = {
    getTexts,
    getTextById,
    saveText
}