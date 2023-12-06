import Prompt from "@app/models/prompt"
import { connectToDb } from "@utils/database"

export const GET = async (req, res) => {

    try {
        await connectToDb()
        const prompt = await Prompt.find({}).populate
        ("creator")
        return new Response(JSON.stringify(prompt), {status: 201})
    } catch (error) {
        return new Response("Failed to create a get all propmts", {status:500})
    }
}