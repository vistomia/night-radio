import { exec } from "child_process"
import util from "util"

const execPromise = util.promisify(exec)

export default class YtdlpService {
	ytdlp: string = "./yt-dlp"
	outputFolder: string = "./downloads"

	async getAudioFromYoutube(youtube_url: string) {
		const data = await this.getData(youtube_url)
		if (data.duration >= 10000) {
			throw Error("Duration")
		}
		const path = await this.download(youtube_url, `${this.outputFolder}/${data.id}.mp3`)

		return {...data, from_url: youtube_url, path: path}
	}

	async getData(youtube_url: string) {
		try {
			const { stdout } = await execPromise(`${this.ytdlp} --dump-json --no-warnings ${youtube_url}`)

			const rawData = JSON.parse(stdout)

			return {
				id: rawData.id,
				title: rawData.title,
				channel: rawData.uploader,
				duration: rawData.duration,
				duration_string: rawData.duration_string,
				thumbnail: rawData.thumbnail,
			}
		} catch (e) {
			throw Error("Cant extract data")
		}
	}

	async download(youtube_url: string, output: string) {
		try {
			const { stdout } = await execPromise(`${this.ytdlp} -x --audio-format mp3 --no-warnings --no-progress -o ${output} ${youtube_url}`)

			return output
		} catch (e) {
			console.error(e)
			throw Error("Cant dowload data")
		}
	}
}
