const express = require('express')
const app = express();
const PORT = process.env.PORT || 5500;
const cors = require('cors')
const { Pool } = require('pg');

const pool = new Pool ({
    user: 'thuandang',
    host: 'localhost',
    database: 'fce',
    // password: '',
    port: 5432,
})


app.use(express.json())
app.use(cors())

//GET ALL
app.get('/api/trainer', async (req, res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM trainers')
        res.status(200).json(rows)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

// GET ONE ITEM
app.get('/api/trainer/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const {rows} = await pool.query('SELECT * FROM trainers WHERE trainer_id = $1', [id]);
        res.status(200).json(rows)
    } catch (error) {
        console.log('Server error', error)
        res.status(500).json(error)
    }
})

app.post('/api/trainer/', async (req, res) => {
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

app.delete('/api/trainer/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {rows} = await pool.query('DELETE from trainers WHERE trainer_id = $1 RETURNING *', [id])
        res.status(200).json(rows)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})


app.patch('/api/trainer/:id', async (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
