import songDao from '../../src/storage/dao/songDao'
describe("Get Song", () => {
    beforeAll(async () => {
        await songDao.injectDB(global.client)
    })

    test("Fetch a song with \`testSong\` title", async () => {
        const replay = await songDao.getSong({ title: "testSong" })
        expect(replay.payload.title).toEqual("testSong")
    })

})
