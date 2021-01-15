import express from 'express'
const router = express.Router()
import MailRouter from './MailRouter'
// import MailCtrl from "./controllers/MailCtrl.js"
// import { MailMiddleWare } from './middleware.js'
//Routes

// MAIL 2
router.use('/mail2', MailRouter);


// BASE
router.route('/')
    .get((req, res, next) => { res.end("Api Up n Runing") }); // base


router.use("*", (req, res) => res.status(404).json({ errorApiRouter: `route -> ${req.originalUrl} ` + " not found" }))





export default router