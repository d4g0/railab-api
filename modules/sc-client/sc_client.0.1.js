const ky = require('ky-universal')
let id
export class SoundCloudClient {

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
    static async setId(id = 'string') {
        // check if the id is good
        try {

        } catch (e) {
            if (err) {
                // rejects with the error
                return Promise.reject(e)
            }
        }
        ky.get(`https://api-v2.soundcloud.com/resolve?url=https://soundcloud.com/riskypatterns&client_id=${id}`)
            .json()
            .then(response => {
                if (response.status !== 403) {
                    this.clientId = id;
                    return { fail: false, reason: null, done: true }
                } else {
                    return Promise.reject({ fail: true, reason: "BAD ID", done: false })
                }
            })
            .catch(err => {
                // console.log(err)
                return Promise.reject({ fail: true, reason: err.message, done: false })
            })



    }
    /**
     * 
     * @param {String} id
     * Sets and id without test it out agains the soundcloud 
     * api (unsafe). 
     */
    async setClientId(id = 'string') {
        this.clientId = id;
        return Promise.resolve("Unsafe Client_Id Setted ")

    }
}