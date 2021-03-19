/**
 * Craft and returns a replay obj with the params
 * @param {object} error 
 * @param {object} result 
 * @param {object} payload 
 */
export const jsonReplay = (error = null, result = "", payload = null) => {
    return { error, result, payload }
}


export function jsonBodyLogger(req, res, next) {
    console.log(
        req.body
    )
    next()
}


export async function delay(seconds = 1) {
    return new Promise(
        (resolve, reject) => {
            const TID = setTimeout(
                () => {
                    resolve()
                }, seconds * 1000
            )
        }
    )
}