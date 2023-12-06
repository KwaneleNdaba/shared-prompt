"use client"
import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

function Feed() {
  const [searchText,setSearchText] = useState("")
  const [posts, setPosts] = useState([])

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }


  useEffect(() => {
    const fetchPost = async () => {
    const response = await fetch("/api/prompt")
    const data = await response.json()
setPosts(data)
    }
  
 fetchPost()
  }, [])
  

  return (
  <section className="feed">
    <form className='relative w-full flex-center'>
      <input type="text" className="search_input peer"   
      placeholder='search for prompt or a user'
      value = {searchText}
      onChange={handleSearchChange}
      required
      />

    </form>

    <PromptCardList
    data = {posts}
    handleClick = {() => {}}
    />
  </section>
  )
}

export default Feed


const PromptCardList = ({data, handleClick}) => {
  return(
    <div className="mt-16 prompt_layout">
    {data.map(prompt => (
      <PromptCard key = {prompt._id} 
      post = {prompt}
      handleClickTag= {handleClick} />
      
    ))}
    </div>
  )
}