import request from "supertest"
import app from "../src/app.js"
import { getAudio, initializeDatabase, resetDatabase } from "./fixtures.js"

beforeAll(initializeDatabase)

afterEach(resetDatabase)

describe("GET /playoutQueue", function () {
    it("empty", async function () {
        const response = await request(app).get("/playoutQueue")

        expect(response.status).toEqual(200)
        expect(response.headers["content-type"]).toMatch(/json/)
        expect(response.body).toEqual({
            playoutQueue: [],
        })
    })
})

describe("POST /playoutQueue", function () {
	it("Queue Audio", async function () {
		const audio = await getAudio() 
        const response = await request(app).post("/playoutQueue").send(
			{
				audio_id: audio.id,
				position: 1,
				status: "pending",
				duration_seconds: 20,
			}
		)

        expect(response.headers["content-type"]).toMatch(/json/)
        expect(response.status).toEqual(201)
        expect(response.body).toEqual({
			"audio": {
    		  "creator": "Carlos",
    		  "duration_seconds": 120,
    		  "from_url": "http://example.com/audio.mp3",
    		  "id": 1,
    		  "message": "Sample message",
    		  "other_details": "Sample details",
    		  "path": "/path/to/audio.mp3",
    		  "status": "active",
    		  "title": "Sample Audio",
    		  "type": "mp3",
    		},
    		"duration_seconds": 20,
    		"id": 1,
    		"position": 1,
    		"status": "pending",
        })

		const response2 = await request(app).get("/playoutQueue")
		
		expect(response2.headers["content-type"]).toMatch(/json/)
        expect(response2.status).toEqual(200)
		expect(response2.body).toEqual({
			playoutQueue: [
				{
					audio: {
						creator: "Carlos",
						duration_seconds: 120,
						from_url: "http://example.com/audio.mp3",
						id: 1,
						message: "Sample message",
						other_details: "Sample details",
						path: "/path/to/audio.mp3",
						status: "active",
						title: "Sample Audio",
						type: "mp3",
					},
					duration_seconds: 20,
					id: 1,
					position: 1,
					status: "pending",
				},
			],
		})
	})
})
