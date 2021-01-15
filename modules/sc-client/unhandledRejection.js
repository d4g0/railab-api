const watchUnhandled = () => {
    process.on('unhandledRejection', (reason) => {
        console.log(`-------------------------------\n-  Unhandled Rejection Catched -\n---------------------------------`)
        console.log(reason)
    })
}

module.exports = watchUnhandled 