import express from 'express'
const router = express.Router()
import MailCtrl from "~/controllers/MailCtrl.js"
// import { MailMiddleWare } from './middleware.js'
//Routes



// MAIL 2
router.route('/')
    .post(
        // MailMiddleWare.isProcessable,
        // MailMiddleWare.routerlyFilters,
        // MailMiddleWare.isAcceptable,
        MailCtrl.sendMail2)



export default router