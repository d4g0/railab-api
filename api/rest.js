const bodyParser = require("body-parser")
const app = require("express")()
import MailCtrl from "./controllers/MailCtrl.js"
import { MailMiddleWare } from './middleware.js'
import TestCtrl from "./controllers/testCtrl.js"
app.use(bodyParser.json())

// BASE
app.route('/')
    .get((req, res, next) => { res.end("Api Up n Runing") }) // test

// MAIL
app.route('/mail')
    .post(
        MailMiddleWare.isProcessable,
        MailMiddleWare.applyFilters,
        MailMiddleWare.isAcceptable,
        MailCtrl.sendMail)



// MAIL 2
app.route('/mail2')
    .post(
        MailMiddleWare.isProcessable,
        MailMiddleWare.applyFilters,
        MailMiddleWare.isAcceptable,
        MailCtrl.sendMail2)



export default app