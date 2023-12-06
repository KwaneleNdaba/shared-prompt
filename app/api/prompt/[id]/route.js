import Prompt from "@app/models/prompt"
import { connectToDb } from "@utils/database"

export const GET = async (req, {params}) => {

    try {
        await connectToDb()
        const prompt = await Prompt.findById(params.id).populate
        ("creator")
        if(!prompt) return new  Response("Prompt not found", {status: 404})
        return new Response(JSON.stringify(prompt), {status: 201})
    } catch (error) {
        return new Response("Failed to create a get all propmts", {status:500})
    }
}


export const PATCH = async (req, {params}) => {
    const {prompt, tag } = await req.json() 
        try {
            await connectToDb()
            const existingPrompt =  await Prompt.findById(params.id);

            if(!existingPrompt) return new Response("Prompt not found", {status: 404})
               existingPrompt.prompt = prompt; // the one we passed from the request
            existingPrompt.tag = tag ;
            await existingPrompt.save()
             return new Response(JSON.stringify(existingPrompt), {status:201})

    } catch (error) {
        return new Response("Failed to update Propt", {status: 500})
    }
}

export const DELETE = async (req, {params}) => {
    try {
        await connectToDb();
        await Prompt.findByIdAndRemove(params.id);
        return new Response("Prompt deleted", {status:201})

    } catch (error) {
        return new Response("Failed to delete Prompt", {status:500})
    }
}