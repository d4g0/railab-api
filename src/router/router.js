import express from 'express'
const router = express.Router()
import MailRouter from './MailRouter'
// import MailCtrl from "./controllers/MailCtrl.js"
// import { MailMiddleWare } from './middleware.js'
//Routes


// BASE
router.route('/')
    .get((req, res, next) => { res.end("Api Up n Runing") }) // base


// MAIL 2
router.use('/mail2',MailRouter)


export default router