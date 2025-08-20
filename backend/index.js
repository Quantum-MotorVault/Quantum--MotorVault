import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

// import mongoose from 'mongoose'
// import Car from './models/Car.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// --- MongoDB connection (commented for future setup) ---
// const MONGO_URI = process.env.MONGO_URI
// if (!MONGO_URI) {
// 	console.warn('[Quantum MotorVault] MONGO_URI not set. Using in-memory sample data.')
// } else {
// 	mongoose
// 		.connect(MONGO_URI)
// 		.then(() => console.log('MongoDB connected'))
// 		.catch(err => console.error('MongoDB connection error:', err))
// }

// Resolve data path relative to this file
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataFile = path.join(__dirname, 'data', 'cars.json')
const sampleCars = JSON.parse(fs.readFileSync(dataFile, 'utf8'))

function applyFilters(cars, query) {
    let results = [...cars]
    const q = (query.q || '').toLowerCase().trim()
    const maker = (query.maker || '').toLowerCase().trim()
    const model = (query.model || '').toLowerCase().trim()
    const priceMin = Number(query.priceMin) || 0
    const priceMax = Number(query.priceMax) || Number.MAX_SAFE_INTEGER
    const mileageMin = Number(query.mileageMin) || 0
    const mileageMax = Number(query.mileageMax) || Number.MAX_SAFE_INTEGER

    results = results.filter(c => {
        const matchesQ = !q ||
            c.title.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q) ||
            c.maker.toLowerCase().includes(q) ||
            c.model.toLowerCase().includes(q)
        const matchesMaker = !maker || c.maker.toLowerCase() === maker
        const matchesModel = !model || c.model.toLowerCase().includes(model)
        const matchesPrice = c.price >= priceMin && c.price <= priceMax
        const matchesMileage = c.mileageKm >= mileageMin && c.mileageKm <= mileageMax
        return matchesQ && matchesMaker && matchesModel && matchesPrice && matchesMileage
    })

    return results
}

app.get('/api/health', (_req, res) => {
    res.json({ ok: true, name: 'Quantum MotorVault API' })
})

app.get('/api/cars', async (req, res) => {
    // --- Uncomment when Mongo is ready ---
    // const cars = await Car.find(/* build conditions from req.query */)
    const results = applyFilters(sampleCars, req.query)
    res.json({ count: results.length, results })
})

app.get('/api/featured', (_req, res) => {
    const featured = sampleCars.slice(0, 6)
    res.json({ count: featured.length, results: featured })
})

app.get('/api/recent', (_req, res) => {
    const recent = [...sampleCars].reverse().slice(0, 8)
    res.json({ count: recent.length, results: recent })
})

app.listen(PORT, () => {
    console.log(`Quantum MotorVault API running on http://localhost:${PORT}`)
})
