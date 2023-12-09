"use client"
import MyProfile from '@components/MyProfile'
import { useSession } from 'next-auth/react'
import { useRouter ,useSearchParams } from 'next/navigation'
import Router from 'next/router'
import React,{useState,useEffect} from 'react'
import Cookies from 'universal-cookie';
const cookies = new Cookies();


function Profile() {

  const {data:session} = useSession()
  const [posts, setPosts] = useState([])
  // console.log("Posts",posts)
  // console.log("user", session?.user.id)
  const searchParams = useSearchParams()
  const userId = cookies.get('myUserId');
  console.log("user", userId)

  const router = useRouter()
  useEffect(() => {
    const userId = localStorage.getItem("creator-id")

    const fetchPost = async () => {
    const response = await fetch(`/api/users/${userId}/posts`)
    const data = await response.json()
    setPosts(data)

    }
    

  
    if(userId)fetchPost();
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
   name = {posts[0]?.creator.username ? `${posts[0]?.creator.username}'s` : "My"}
   desc= {posts[0]?.creator.username ? `"Welcome to ${posts[0]?.creator.username}'s personalized profile` : "your personalized profile"}  
   data = {posts}
   handleDelete={handleDelete}
   handleEdit = {handleEdit}
   
   />
  )
}

export default Profile
