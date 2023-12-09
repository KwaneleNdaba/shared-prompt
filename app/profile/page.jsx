"use client"
import MyProfile from '@components/MyProfile'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Router from 'next/router'
import React,{useState,useEffect} from 'react'


function Profile() {

  const {data:session} = useSession()
  const [posts, setPosts] = useState([])
  // console.log("Posts",posts)
  // console.log("user", session?.user.id)

  const router = useRouter()
  useEffect(() => {
    const fetchPost = async () => {
    const response = await fetch(`/api/users/${session?.user.id}/posts`)
    const data = await response.json()
setPosts(data)
    }
  
    if(session?.user.id)fetchPost();
  }, [])
  


const handleEdit = (postId) => {
 // debugger;
router.push(`/update-prompt?id=${postId}`)
}


const handleDelete = async (postId) => {
  const hasConfirmed = confirm("Are you sure you want to delete this prompt?")
  
  if(hasConfirmed){
    try {
      debugger;
      await fetch(`/api/prompt/${postId}`,{
        method: "DELETE",
      })
      debugger;
      const filterPosts = posts.filter(p => p._id !== postId );
      setPosts(filterPosts)
      
    } catch (error) {
      console.log("Error: ", error)
    }
  }

}

  return (
   <MyProfile 
   name = "My"
   desc= "Welcome to your personalized profile page"
   data = {posts}
   handleDelete={handleDelete}
   handleEdit = {handleEdit}
   
   />
  )
}

export default Profile
