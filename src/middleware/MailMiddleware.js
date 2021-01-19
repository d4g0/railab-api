import validator from 'validator'
import xssFilters from 'xss-filters'
import { jsonReplay } from '~/utils'




/**
 * Continue next middleware if the 
 * `req.body` containst a useful `email`
 * obj with `{sender,message}`.
 * Finish the rest chain with 422 and `jsonReplay`
 * with a `Bad Request` error.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const isProcessable = (req, res, next) => {
    const { data } = req.body
    if (data && data.sender && data.message) {
        // Acceptable
        return (
            next()
        )
    }
    return (
        res.status(400).json(jsonReplay("Bad Request", "FAIL", null))
    )
}



/**
 * Apply XXS-Filters in the incoming req
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const applyFilters = (req, res, next) => {
    //----------
    // Filters
    //----------
    let { sender, message } = req.body.data
    sender = xssFilters.inHTMLData(sender)
    message = xssFilters.inHTMLData(message)
    req.body.email = { sender, message }


    // console.log(
    //     'api/middleare/applyFilters',
    //     req.body.email
    // )

    return (next())
}



/**
 * Continue next middleware if the 
 * `req.body` containst a useful `email`
 * obj with `{sender,message}`.
 * Finish the rest chain with 422 and `jsonReplay`
 * with a `Not Acceptable Sender` error.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const isAcceptable = (req, res, next) => {
    const { sender } = req.body.data
    if (validator.isEmail(sender)) {
        return (
            next()
        )
    }

    return (
        res.status(422).json(jsonReplay("Not Acceptable Sender", "FAIL", null))
    )
}


// export class ApiMiddleMan {
//     // TODO
//      isLegit = () => {
//         // Implement JWT validation for ignore non client-app requests
//     }
// }