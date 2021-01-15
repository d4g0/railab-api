import { jsonReplay, toHtml } from './_helpers.js'
const nodemailer = require('nodemailer');
import { google } from 'googleapis'
const OAuth2 = google.auth.OAuth2
const {
    GMAIL_USER,
    GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET,
    GMAIL_CLIENT_REFRESH_TOKEN,
    RECIPIENTS_LIST } = process.env

const RECIPIENTS = [RECIPIENTS_LIST.split(',')]

const myOAuth2Client = new OAuth2(
    GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground")

myOAuth2Client.setCredentials(
    { refresh_token: GMAIL_CLIENT_REFRESH_TOKEN }
);
const myAccessToken = myOAuth2Client.getAccessToken()

const TRANSPORT = nodemailer.createTransport({
    logger: process.env.NODE_ENV === 'development' ? true : false,
    socketTimeout: 1e4,
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: GMAIL_USER, //your gmail account you used to set the project up in google cloud console"
        clientId: GMAIL_CLIENT_ID,
        clientSecret: GMAIL_CLIENT_SECRET,
        refreshToken: GMAIL_CLIENT_REFRESH_TOKEN,
        accessToken: myAccessToken
    }
});


export default class MailService {

    /**
     * Atemps to send an email.
     * Returns a jsonReplay `{error,result,payload}`
     * containig an `error ,"FAIL",null` in case an error arise,
     * or `null,"OK",info`.
     * Where `info` is collected from transporter.sendMail()
     * @param {object} email 
     */
    static async sendMail(email = { sender: "defaultSender", msg: "defaultMessage" }) {
        let replay
        let tranporter = TRANSPORT
        let mailOptions = {
            from: "railabmailer@gmail.com",
            to: RECIPIENTS,
            subject: 'RAILAB MAIL',
            html: toHtml(email)
        }
        await tranporter.sendMail(mailOptions)
            .then(
                info => {
                    replay = jsonReplay(null, "OK", info)
                }
            )
            .catch(
                error => {
                    replay = jsonReplay(error, "FAIL", null)
                }
            )

        return replay
    }

    static async sendMail2(sender = "defaultSender", msg = "defaultMessage") {
        let replay
        let tranporter = TRANSPORT
        let mailOptions = {
            from: "railabmailer@gmail.com",
            to: RECIPIENTS,
            subject: 'RAILAB MAIL',
            html: toHtml({
                sender,
                msg
            })
        }
        await tranporter.sendMail(mailOptions)
            .then(
                info => {
                    replay = jsonReplay(null, "OK", info)
                }
            )
            .catch(
                error => {
                    replay = jsonReplay(error, "FAIL", null)
                }
            )
                
        return replay
        // return new Promise(
        //     (resolve,reject)=>{
        //         setTimeout(
        //             _=>{
        //                 resolve(replay)
        //             },
        //             3000
        //         )
        //     }
        // )
    }
}