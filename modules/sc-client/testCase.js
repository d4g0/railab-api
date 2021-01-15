const { setId, getId, resolve, errHandlers, handleErrors } = require('./index')
errHandlers.netErrorHandler = () => { console.log('AJA NET.ERR') }          //
errHandlers.badIdErrorHandler = () => { console.log('AJA BAD ID') }            //
errHandlers.notFoundErrorHanlder = () => { console.log('AJA NOT FOUND') }      //
errHandlers.unknowErrorHandler = () => { console.log('AJA UNKNOW ERR') }
errHandlers.badUrlErrorHandler = () => { console.log('AJA BAD URL ') }           //
errHandlers.clientIdMissingError = () => { console.log('AJA CLIENT ID MISSING') }   //
errHandlers.badTrackInfoErrorHandler = () => { console.log('BAD TRACK INFO ERR ') }   //

// 

const handlerErr = (err) => { handleErrors(err) }
setId('wNHGoG6RrCXPaRsA49blO9sZxs98xaQ6').then(
    () => {
        resolve(
            `https://soundcloud.com/chillhopdotcom/moods-x-yasper-sofa-stories-full-ep`
        )
            .then(data => {
                console.log(`--------------\n- STREAM URL -\n--------------\n`)
                console.log(data.streamUrl.url)
                console.log(`\n`)

            })
    }
)
    .catch(err => { handlerErr(err) })
