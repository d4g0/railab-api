import express from 'express'
const router = express.Router()

// import MailCtrl from "./controllers/MailCtrl.js"
// import { MailMiddleWare } from './middleware.js'
//Routes


// BASE
router.route('/api')
    .get((req, res, next) => { res.end("Api Up n Runing") }) // test


// MAIL 2
// router.route('/mail2')
//     .post(
//         MailMiddleWare.isProcessable,
//         MailMiddleWare.routerlyFilters,
//         MailMiddleWare.isAcceptable,
//         MailCtrl.sendMail2)



export default router