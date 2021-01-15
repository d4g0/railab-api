import validator from ('validator').default
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

export { isUrl }

