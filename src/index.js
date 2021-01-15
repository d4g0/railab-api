import app from "./server"
import { banner } from './banner.js'

const port = process.env.PORT || 3500;

app.listen(port, () => {
    console.log(banner)
})

