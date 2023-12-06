"use client";
import Image from "next/image";
import React, { useState } from "react";

function PromptCard({ post, handleClickTag, handleEdit, handleDelete }) {
  console.log("post", post);
  const [copied, setCopy] = useState("");


  const handleCopy = () => {
    setCopy(post.prompt)
    navigator.clipboard.writeText(post.prompt)//be able to copy
    setTimeout(()=> setCopy(""), 3000)
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            className="rounded -full object-contain"
            alt="Profile"
            width={40}
            height={40}
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi text-gray-900 font-semibold">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div onClick={() => handleCopy()} className="copy_btn">
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p onClick={() => handleClickTag && handleClickTag(post.tag) } className="font -inter text-sm blue_gradient cursor-pointer">#{post.tag}</p>
    </div>
  );
}

export default PromptCard;
