const express = require('express')
const app = express();
const PORT = process.env.PORT || 5500;
const cors = require('cors')
const { Pool } = require('pg');

const pool = new Pool({
    user: 'thuandang',
    password: '',
    host: 'localhost',
    // port: 5432,
    database: 'fce'
})

app.use(express.json())
app.use(cors())

/**********************************************************/
//GET ALL
app.get('/api/trainers', async (req, res, next) => {
    try {
        const {rows} = await pool.query('SELECT * FROM trainers')
        res.status(200).json(rows)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

// GET ONE ITEM
app.get('/api/trainers/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const {rows} = await pool.query('SELECT * FROM trainers WHERE trainer_id = $1', [id]);
        res.status(200).json(rows)
    } catch (error) {
        console.log('Server error', error)
        res.status(500).json(error)
    }
})

app.post('/api/trainers/', async (req, res, next) => {
    try {
        const {picture, first_name, last_name, email, phone_number, bodybuilding, running, power_lifting, cycling, swimming} = req.body
        // add data validation
        const {rows} = await pool.query('INSERT INTO trainers(picture, first_name, last_name, email, phone_number, bodybuilding, running, power_lifting, cycling, swimming) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', [picture, first_name, last_name, email, phone_number, bodybuilding, running, power_lifting, cycling, swimming])
        res.status(201).json(rows)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

app.delete('/api/trainers/:id', async (req, res, next) => {
    try {
        const {id} = req.params
        const {rows} = await pool.query('DELETE from trainers WHERE trainer_id = $1 RETURNING *', [id])
        res.status(200).json(rows)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

app.patch('/api/trainers/:id', async (req, res, next) => {
    try {
        const {picture, first_name, last_name, email, phone_number, bodybuilding, running, power_lifting, cycling, swimming} = req.body
        const {id} = req.params
        // add data validation
        const {rows} = await pool.query('UPDATE trainers SET picture = $1, first_name = $2, last_name = $3, email = $4, phone_number = $5, bodybuilding = $6, running = $7, power_lifting = $8, cycling = $9, swimming = $10 WHERE trainer_id = $11 RETURNING *', [picture, first_name, last_name, email, phone_number, bodybuilding, running, power_lifting, cycling, swimming, id])
        res.status(200).json(rows)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})


/**********************************************************/

// GET all 
app.get('/api/comments', async(req, res, next) => {
    try {
        let {rows} = await pool.query('SELECT * FROM comments')
        res.status(200).json(rows)
    } catch (error) {
        console.log('Internal server error')
        res.status(500).json(error)
    }
})

// GET one based on user id 
app.get('/api/comments/:id', async(req, res, next) => {
    try {
        const {id} = req.params
        let {rows} = await pool.query('SELECT * FROM comments WHERE comment_id = $1', [id])
        res.status(200).json(rows)
    } catch (error) {
        console.log('Internal server error')
        res.status(500).json(error)
    }
})

// POST one 
app.post('/api/comments', async(req, res, next) => {
    try {
        const {comment_body, trainer_id} = req.body
        // data validation
        if (typeof comment_body !== 'string' || typeof trainer_id !== 'number') {
            res.status(404).send('Bad request')
        } else {
            let {rows} = await pool.query('INSERT INTO comments(comment_body, trainer_id) VALUES ($1, $2) RETURNING *', [comment_body, trainer_id])
            res.status(201).json(rows)
        }
    } catch (error) {
        console.log('Internal Server Error')
        res.status(500).json(error)
    }
})

// UPDATE one
app.patch('/api/comments/:id', async(req, res, next) => {
    try {
        const {id} = req.params
        const {comment_body, trainer_id} = req.body
        if (typeof comment_body !== 'string' || typeof trainer_id !== 'number') {
            res.status(404).send('Bad request')
        } else {
            let {rows} = await pool.query('UPDATE comments SET comment_body = $1, trainer_id = $2 WHERE comment_id = $3 RETURNING *', [comment_body, trainer_id, id])
            res.status(200).json(rows)
        }
    } catch (error) {
        console.log('Internal Server Error')
        res.status(500).json(error)
    }
})

// DELETE one 
app.delete('/api/comments/:id', async(req, res, next) => {
    try {
        const {id} = req.params
        let {rows} = await pool.query('DELETE FROM comments WHERE comment_id = $1 RETURNING *', [id])
        res.status(200).json(rows)
    } catch (error) {
        console.log('Internal Server Error')
        res.status(500).json(error)
    }
})

/**********************************************************/

// handle unknown http reqs
app.use( (req, res, next) => {
    res.status(404).end("Not Found")
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
