/**
 * @type {string[]}
 */
export const urls = [
    "https://www.lempire.com/",
    "https://www.lemlist.com/",
    "https://www.lemverse.com/",
    "https://www.lemstash.com/"
]

/**
 * @returns {string}
 */
export const getRandomUrl = () => {
    return urls[Math.floor(Math.random() * urls.length)]
}
