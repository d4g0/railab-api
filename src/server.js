import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import morgan from "morgan"
import router from './router/router'
const app = express()

app.use(cors())
process.env.NODE_ENV !== "production" && app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use("/", router)

// app.use("/api/v1/movies", movies)
// app.use("/api/v1/user", users)
// app.use("/status", express.static("build"))
// app.get('/', (req, res) => res.end('up and runing..'))
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

export default app
