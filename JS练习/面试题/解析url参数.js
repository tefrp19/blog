let url = 'http://127.0.0.1/search?a=123&b=test1&c=test2'
/**
 * 
 * @param {String} url 
 * @returns {Object}
 */
const parseUrl = url => {
    const params = url.split('?')[1].split('&')
    const paramsLength = params.length
    const obj = {}
    for (let i = 0; i < paramsLength; i++) {
        const [key, value] = params[i].split('=')
        obj[key] = value
    }
    return obj
}
const obj = parseUrl(url)
console.log(obj);
