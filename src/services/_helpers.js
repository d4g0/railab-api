/**
 * Craft and returns a replay obj with the params
 * @param {object} error 
 * @param {object} result 
 * @param {object} payload 
 */
export const jsonReplay = (error = null, result = "", payload = null) => {
    return { error, result, payload }
}

export const toHtml = (data = { sender: "defaultSender", msg: "defaultMessage" }) => {
    const { sender, msg } = data
    return `
    <h1>Railab Mail</h1>
    <p>
        <strong>Sender:</strong><br>
        ${sender}
    </p>
    <p>
        <strong>Message:</strong><br>
        ${msg}
    </p>
    <br>
    <a href="mailto:${sender}"
        style=" text-decoration: none; background-color: black; color: whitesmoke;padding: 10px; border-radius: 6px;">
        Replay
    </a>
    `
}