const express = require('express')
const app = express();
const PORT = process.env.PORT || 5500;
const cors = require('cors')
app.use(express.json())
const { Pool } = require('pg');
const pool = new Pool ({
    user: 'devinbraxton',
    host: 'localhost',
    database: 'trainers',
    // password: '',
    port: 5432,
})

app.use(cors())

//GET ALL
app.get('/api/trainer', async (req, res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM trainer')
        res.status(200).json(rows)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})
// GET ONE ITEM
app.get('/api/trainer/:id', async (request, response) => {
    const { id } = request.params;
    try {
        const insertCmd = await pool.query('SELECT * FROM trainer WHERE trainer_id = $1', [id]);
        response.status(201).json(insertCmd.rows)
    } catch (error) {
        console.log('Server error', error)
        response.status(500).json(error)
    }
})
app.post('/api/trainer/', async (req, res) => {
    try {
        const {firstName: first_name, lastName: last_name, email, phoneNumber: phone_number, yearsOfExperience: years_of_experience, bodybuilding, crossfit, running, olympicLifting: olympic_lifting, powerLifting: power_lifting, strongman, calistenics: calisthenics, cycling, functionalFitness: functional_fitness, dance} = req.body
        const {rows} = await pool.query('INSERT INTO trainer(first_name, last_name, email, phone_number, years_of_experience, bodybuilding, crossfit, running, olympic_lifting, power_lifting, strongman, calisthenics, cycling, functional_fitness, dance) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *', [first_name, last_name, email, phone_number, years_of_experience, bodybuilding, crossfit, running, olympic_lifting, power_lifting, strongman, calisthenics, cycling, functional_fitness, dance])
        res.status(200).json(rows)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})
app.delete('/api/trainer/:id', async (req, res) => {
    try {
        const {id} = req.params
        await pool.query('DELETE from trainer WHERE trainer_id = $1 RETURNING *', [id])
        res.status(200).json({message: 'Trainer Deleted'})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})
app.patch('/api/trainer/:id', async (req, res) => {
    try {
        console.log("This is my patch req req.body", req.body)
        const {first_name, last_name, email, phone_number, years_of_experience, bodybuilding, crossfit, running, olympic_lifting, power_lifting, strongman, calisthenics, cycling, functional_fitness, dance} = req.body
        const {id} = req.params
        await pool.query('UPDATE trainer SET first_name = $1, last_name = $2, email = $3, phone_number = $4, years_of_experience = $5, bodybuilding = $6, crossfit = $7, running = $8, olympic_lifting = $9, power_lifting = $10, strongman = $11, calisthenics = $12, cycling = $13, functional_fitness = $14, dance = $15 WHERE trainer_id = $16 RETURNING *', [first_name, last_name, email, phone_number, years_of_experience, bodybuilding, crossfit, running, olympic_lifting, power_lifting, strongman, calisthenics, cycling, functional_fitness, dance, id])
        res.status(200).json({message: "Trainer Updated"})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})