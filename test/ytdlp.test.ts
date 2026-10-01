import YtdlpService from "../src/services/ytdlp.service.js"

describe("test", function () {
    it("getData", async function () {
        const service = new YtdlpService()
        const response = await service.getData("HXYNW0ft5o4")

        expect(response).toEqual({
            channel: "Armazém de memes",
            duration: 2,
            duration_string: "2",
            id: "HXYNW0ft5o4",
            thumbnail: "https://i.ytimg.com/vi/HXYNW0ft5o4/maxresdefault.jpg",
            title: "Rapaz (Xaropinho) - (Áudio)",
        })
    }, 20000)

    it("download", async function () {
        const service = new YtdlpService()
        const response = await service.getAudioFromYoutube("HXYNW0ft5o4")
        expect(response).toEqual({
            channel: "Armazém de memes",
            duration: 2,
            duration_string: "2",
            from_url: "HXYNW0ft5o4",
            id: "HXYNW0ft5o4",
            path: "./downloads/HXYNW0ft5o4.mp3",
            thumbnail: "https://i.ytimg.com/vi/HXYNW0ft5o4/maxresdefault.jpg",
            title: "Rapaz (Xaropinho) - (Áudio)",
        })
    }, 20000)	
})
