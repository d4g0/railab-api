const validator = require('validator').default
const ky = require('ky-universal')

/**
 * 
 * @param {URL} url
 * Returns true if is a URL string
 * False other wise
 * Expected String URL
 */
const isUrl = (url = "string") => {
    let result = false
    if (typeof url === 'string') {
        result = validator.isURL(url)
    }
    return result
}
/**
 * My Sound_Cloud_Client
 * 
 */
class Sound_Cloud_Client {
    constructor() { }
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
    async setClientIdSafe(id = 'string') {
        // check if the id is good
        return ky.get(`https://api-v2.soundcloud.com/resolve?url=https://soundcloud.com/riskypatterns&client_id=${id}`)
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
    /**
     * 
     * @param {String} url
     * @returns {Promise}
     * Returns a promise with the `trackInfo`(json) of the url 
     * ; a rejected one with  `BAD URL`  case a wrong url or 
     * `Client_Id_Missing` in case the client_id is unavailable
     */
    resolve(url) {
        if (this.clientId) {
            if (isUrl(url)) {
                const getTrackInfo = async (url) => {
                    const info = await ky.get(`https://api-v2.soundcloud.com/resolve?url=${url}&client_id=${this.clientId}`)
                        .json()
                    // console.log(info)
                    return info
                }
                return getTrackInfo(url)
            }
            else {
                return Promise.reject('BAD URL')
            }
        } else {
            return Promise.reject('CLIENT_ID MISSING')
        }

    }
    /**
     * 
     * @param {Object} trackInfo
     * Recives the track info gatered with a succesfull client resolution
     * and returns the a promise with the  `{ trackInfo, streamaUrl }` as result
     * or `BAD TRACK INFO` rejection cause
     */
    async getStreamUrl(trackInfo) {

        //check if there is a usesfull transcoding object in the track info
        if (trackInfo.media
            && trackInfo.media.transcodings
            && trackInfo.media.transcodings[1]
            && trackInfo.media.transcodings[1].format
            && trackInfo.media.transcodings[1].format.protocol === 'progressive') {

            const requestURL = `${trackInfo.media.transcodings[1].url}?client_id=${this.clientId}`
            const streamUrl = await ky.get(requestURL).json()
            return { trackInfo, streamUrl }

        } else {

            return Promise.reject('BAD TRACK INFO')
        }
    }

}

module.exports = Sound_Cloud_Client



