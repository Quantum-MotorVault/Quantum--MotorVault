# Quantum MotorVault

A React + JavaScript + Express starter modeled after the look and feel of the sharrai.ae landing page, customized for "Quantum MotorVault".

This project ships with:
- Vite + React frontend (`client/`)
- Express API server (`server/`)
- Sample car data and filtering endpoints
- Commented MongoDB/Mongoose code for future setup

## Quick start

1) Install dependencies

```bash
# from repository root
cd server && npm i
cd ../client && npm i
```

2) Run the API

```bash
cd server && npm run dev
```

3) Run the frontend (in another terminal)

```bash
cd client && npm run dev
```

Frontend will start on `http://localhost:5173` and proxies `/api/*` to `http://localhost:5000`.

## Environment (server)

Copy `.env.example` to `.env` inside `server/` when you are ready to connect MongoDB.

```bash
MONGO_URI=mongodb+srv://USER:PASS@CLUSTER/dbname
PORT=5000
```

Currently, MongoDB code is intentionally commented out. The API uses in-memory sample JSON until you enable Mongo.

## Project structure

- `client/` React app (home UI, filters, car lists)
- `server/` Express API (cars endpoint, filter parsing)

## Credits and references

Design inspiration and copy adapted from `https://sharrai.ae/`.

- Homepage sections: navigation, hero, filters, featured cars, recently added, footer
- This project is a functional clone-style starter for learning and internal demo purposes

## Scripts

- client: `npm run dev`, `npm run build`, `npm run preview`
- server: `npm run dev`, `npm start`

## Notes

- Replace placeholder images/links as needed.
- When ready, uncomment MongoDB lines in `server/index.js` and `server/models/Car.js`, provide a valid `MONGO_URI`, and swap sample data with real queries.
