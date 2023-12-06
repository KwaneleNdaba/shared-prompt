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
  


const handleEdit = (post) => {
router.push(`/update-prompt?id=${post.id}`)
}


const handleDelete = async () => {


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
