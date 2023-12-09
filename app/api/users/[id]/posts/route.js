import Prompt from "@app/models/prompt"
import { connectToDb } from "@utils/database"

export const GET = async (req, {params}) => {

    try {
        await connectToDb()
        const prompt = await Prompt.find({
            creator : params.id
        }).populate
        ("creator")
        return new Response(JSON.stringify(prompt), {status: 201})
    } catch (error) {
        return new Response("Failed to create a get all prompts", {status:500})
    }
}

