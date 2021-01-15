import os from 'os'
const port = process.env.PORT || 3500;

const netaddres = os.networkInterfaces().wlo1 ?
    os.networkInterfaces().wlo1[0].address
    :
    "localhost"
const addressStr = os.networkInterfaces().wlo1 ?
    `http://${netaddres}:${port}`
    :
    `http://${netaddres}:${port}    `




export const banner = `\n
╔══════════════════════════════════════════════╗
║                                              ║
║  ⚙️  App ⚙️                                    ║
║                                              ║
║  Listening at ${addressStr}        ║
║                                              ║ 
╚══════════════════════════════════════════════╝\n
`

// ╔╗═╚╝║




