/**
 * Craft and returns a replay obj with the params
 * @param {object} error 
 * @param {object} result 
 * @param {object} payload 
 */
export const jsonReplay = (error = null, result = "", payload = null) => {
    return { error, result, payload }
}

