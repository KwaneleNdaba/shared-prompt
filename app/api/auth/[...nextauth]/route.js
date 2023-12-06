import User from "@app/models/user";
import { connectToDb } from "@utils/database";
import NextAuth from "next-auth";
import  GoogleProvider  from "next-auth/providers/google";


// Configuration for authentication providers

// console.log("Keys",
//     {
//         clientId: process.env.GOOGLE_ID,
//         // Insert your Google OAuth client secret here
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET
//     }
// )

const handler = NextAuth({
    providers: [
        // Instantiating GoogleProvider for authentication
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    async session({ session }) {
        // Session handling logic
        //we need to get the data about that user everytime they are online 

        const sessionUser = await User.findOne({email:session.user.email})
        session.user.id = sessionUser._id.toString();
        return session;
    },
    async signIn({ profile }) {
        try {
            await connectToDb();//connecting to database

            const userExist = User.findOne({ email: profile.email });//the profile will be passed on the function when we sign in

            if(!userExist) {
                await User.create({
                    email: profile.email,
                    username: profile.username.replace(" ","" ).toLowerCase(),//making sure that the username does not have spaces 
                    image : profile.picture
                })
            }

            return true;
        } catch (error) {
            console.log(error)
        }
        // Sign-in handling logic
    }
});

// Exporting the handler for both GET and POST requests
export { handler as GET, handler as POST };
