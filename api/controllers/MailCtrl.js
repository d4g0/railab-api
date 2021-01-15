import { jsonReplay } from './_helpers.js'
import MailService from '../services/MailService.js'
export default class MailCtrl {
    /**
     * Atemps to send a email with the suplied 
     * contents. If success replays with `200`
     * and a `jsonRplay` as:
     * `{
     * error:null,
     * result:"OK",
     * payload:null
     * }`
     * 
     * or 
     * 
     * `500` and 
     * `{
     * error:error ,
     * result:"FAIL",
     * payload:null
     * }`
     * 
     * otherwise; where `error` contains the captured error.
     * 
     * @param {object} req 
     * @param {object} res 
     * @param {object} next
     */
    static async sendMail(req, res, next) {

        const { sender, msg } = req.body.data
        const replay = await MailService.sendMail2(sender, msg)


        if (replay.error) {
            return (    
                res.status(200).json(jsonReplay(replay.error, "FAIL", null))
            )

        } else {

            return (    
                res.status(200).json(jsonReplay(null, "OK", replay.payload))
            )

        }
    }

    static async sendMail2(req, res, next) {
        const { sender, msg } = req.body.data
        // const { sender, msg } = data
        // console.log({ sender, msg } )
        const replay = await MailService.sendMail2(sender, msg)

        if (replay.error) {
            return (    
                res.status(500).json(jsonReplay(replay.error, "FAIL", null))
            )

        } else {

            return (    
                res.status(200).json(jsonReplay(null, "OK", replay.payload))
            )

        }
    }
}