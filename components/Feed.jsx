"use client"
import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'
import Cookies from 'universal-cookie';
const cookies = new Cookies()
function Feed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]); 

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    filterPosts(e.target.value);
  };

  const filterPosts = (searchValue) => {
    const filteredByUser = posts.filter((post) => post.creator.username.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredPosts(filteredByUser); 

    if(filteredByUser.length === 0){
      
    const filterdByPrompt = posts.filter((post) => post.prompt.toLowerCase().includes(searchValue.toLowerCase()))
    setFilteredPosts(filterdByPrompt)

    if(filterdByPrompt.length == 0){
      const filterdByTag = posts.filter((post) => post.tag.toLowerCase().includes(searchValue.toLowerCase()))
      setFilteredPosts(filterdByTag)
    }
    }


  };

  const searchValue = (value) => {
    setSearchText(value)
    filterPosts(value)
  }

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
      console.log("data: " + response)
    };

    fetchPost();
  }, []);


  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          className="search_input peer"
          placeholder="Search for prompt or a user"
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>

      <PromptCardList
        data={filteredPosts} // Render filteredPosts instead of posts
        handleClick={searchValue}
      />
    </section>
  );
}

export default Feed


const PromptCardList = ({data, handleClick}) => {

  const saveId = (id) => {
    localStorage.setItem("creator-id",id)
  }

  return(
    <div className="mt-16 prompt_layout">
    {data.map(prompt => (
      <div onClick={() => saveId(prompt.creator._id)}>
        <PromptCard 
      key = {prompt._id} 
      post = {prompt}
      handleClickTag= {handleClick} />
      
        </div>
    ))}
    </div>
  )
}