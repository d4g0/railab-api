const Sound_Cloud_Client = require('./Sound_Cloud_Client')
const scc = new Sound_Cloud_Client()

/**
 * 
 * @param {String} id
 * Sets the id of the underlying Sound Cloud Client instance.
 */
const setId = (id = "client_id") => {
    return scc.setClientId(id)
}
/**
 * @param {String} id 
 * Sets the client id for the session.
 * Test the veracity of the id against
 * the soundcloud api, end returns a promise
 * that resolves with: 
 * a `{ fail: false, reason: null, done: true }` obj case good,
 * or rejects with: 
 * { fail: true, reason: "BAD ID", done: false } case a `BAD ID`,
 * or 
 * { fail: true, reason: err.message, done: false } case an net Operational err.
 */
const setClientIdSafe = (id = "client_id") => {
    return scc.setClientIdSafe(id)
}
/**
 * Returns the current client_id 
 */
const getId = () => {
    return scc.clientId
}
/**
 * 
 * @param {String} url
 * Returns a promise with a `data` object containing the 
 * `streamUrl` and the `trackInfo` values of the resource.
 * 
 * OR a  rejected promise  with:
 * * `BAD URL`  case a wrong `url`
 * * `CLIENT ID MISSING` in case the `client_id` is unavailable
 * * `BAD TRACK INFO` in case the `trackInfo` was unusefull
 * 
 * ⚠️ WARN: Network errors may arrise, custom hanlding are needed(.catch)
 * 
 * Posible errors:
 * * Network (Node Fetch / Node Native Network errors)
 * * Bad Client Id  (Ky error / response.status = 401)
 * * Not Found  (ky error / response.status = 404)
 * * Unknow (ky error / unknow response err)
 * * Bad url  (buil-in err / rejected promise with `BAD URL` reason)
 * * Client id missing  (buil-in err / rejected promise with `CLIENT_ID MISSING` reason)
 * 
 * 🏄️ Use built-in fucntion HandleErrors.
 *  
 */
const resolve = async (url) => {
    return scc.resolve(url).then(info => {
        return scc.getStreamUrl(info).catch(err => {
            if (err) {
                console.log(err)
                return err
            }
        })
    })
}
/**
 * 

 */
const errHandlers = {
    netErrorHandler: () => { console.log('-NET ERR-') },
    badIdErrorHandler: () => { console.log('-BAD ID ERR-') },
    notFoundErrorHanlder: () => { console.log('-NOT FOUND ERR-') },
    unknowErrorHandler: () => { console.log(`- Unknow Err: ${err.response.status} ${err.response.statusText}`) },
    badUrlErrorHandler: () => { console.log('-BAD URL ERR-') },
    clientIdMissingError: () => { console.log('-CLIENT ID MISSING-') },
    badTrackInfoErrorHandler: () => { console.log("- BAD TRACK INFO ERR -") }
}

/**
 * 
 * @param {Object} err
 * Handle all posible errors that a resolution (`scc.resolve`) may throw.
 * Can be extended with custom function, assigning the proper handler in the errHandlers object (errHandlers.handlerName) .
 * The custom handlers can be: 
 * * Network Error Handler (netErrorHandler)
 * * Bad Client_id Hanlder (badIdErrorHandler)
 * * Not Found Hanlder     (notFoundErrorHanlder)
 * * Unknow Err  Handler   (unknowErrorHandler)
 * * Bad url Handler       (badUrlErrorHandler)
 * * Client id missing H   (clientIdMissingError)
 * 
 */
function handleErrors(err) {
    //  BAD URL ERR
    if (err == 'BAD URL') {
        errHandlers.badUrlErrorHandler()
        return

    } else {
        //  CLIENT ID MISSING
        if (err == 'CLIENT_ID MISSING') {
            errHandlers.clientIdMissingError()
            return

        } else {
            //  Node Fetch / Node Native errors
            if (err.type && err.type === "system") {
                // NETWORK ERR
                errHandlers.netErrorHandler()
                return

            } // Ky Response Errors
            else {
                //BAD CLIENT ID
                if (err.response.status == 401) {
                    errHandlers.badIdErrorHandler()
                    return

                }
                else {
                    //NOT FOUND
                    if (err.response.status == 404) {
                        errHandlers.notFoundErrorHanlder()
                        return

                    }// BAD TRACK INFO ERR 
                    else {
                        if (err == "BAD TRACK INFO") {
                            errHandlers.badTrackInfoErrorHandler()
                            return
                        }// UNKNOW ERR 
                        else {
                            errHandlers.unknowErrorHandler()
                            return
                        }


                    }
                }
            }
        }
    }

}
module.exports = { setId, setClientIdSafe, getId, resolve, handleErrors, errHandlers }