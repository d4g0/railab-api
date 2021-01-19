import express from 'express'
const router = express.Router()
import MailCtrl from "~/controllers/MailCtrl.js"
import { isProcessable , applyFilters, isAcceptable} from '~/middleware/MailMiddleware.js'
//Routes



// MAIL 2
router.route('/')
    .post(
        isProcessable,
        applyFilters,
        isAcceptable,
        MailCtrl.sendMail)
// .get(
//     (req, res) => res.status(200).json({ 'MailRouter [get][/mail2] ': `route hit in -> ${req.originalUrl} ` })
// )



export default router