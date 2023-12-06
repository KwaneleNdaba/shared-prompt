import { connectToDb } from "@utils/database"

export const POST = async (req, res) => {
    const {userId , tag ,  prompt} = await req.json()

    try {
        await connectToDb()
        
    } catch (error) {
        
    }
}