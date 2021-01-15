import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import morgan from "morgan"
import router from './router/router'
const app = express()

app.use(cors())
//
// Debug
//
// process.env.NODE_ENV !== "production" && app.use(morgan("dev"))
app.use(morgan("dev"))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use("/api", router)

app.use("*", (req, res) => res.status(404).json({ error: `route -> ${req.originalUrl} ` + " not found" }))


export default app
