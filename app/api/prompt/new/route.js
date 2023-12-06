import Prompt from "@app/models/prompt"
import { connectToDb } from "@utils/database"

export const POST = async (req, res) => {
    const {userId , tag ,  prompt} = await req.json()//getting the data from the frondend or request

    try {
        await connectToDb()
        const newPrompt = new Prompt({
            creator: userId ,
            prompt,
            tag ,
           
        })

        await newPrompt.save()
        return new Response(JSON.stringify(newPrompt), {status: 201})
    } catch (error) {
        return new Response("Failed to create a new Prompt", {status:500})
    }
}