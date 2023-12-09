"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function PromptCard({ post, handleClickTag, handleEdit, handleDelete , }) {
  console.log("post", post);
  const [copied, setCopy] = useState("");

  const pathName = usePathname()
  const router = useRouter()

  const {data :session} = useSession()

  const handleCopy = () => {
    setCopy(post.prompt)
    navigator.clipboard.writeText(post.prompt)//be able to copy
    setTimeout(()=> setCopy(""), 3000)
  }

  console.log("user", session?.user.id)
  
  console.log("creator",  post)



  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
        <Link href={session?.user.id === post.creator._id  ? "/profile": `/profile/${post.creator._id}`}>
        <Image
            src={post.creator.image}
            className="rounded -full object-contain"
            alt="Profile"
            width={40}
            height={40}
          />
        </Link>
          <div className="flex flex-col">
            <h3 onClick={() => handleClickTag && handleClickTag(post.creator.username) }  className="font-satoshi text-gray-900 font-semibold" >
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
    
      {session?.user.id === post.creator._id && pathName == "/profile" && (
      <div className="mt-5 flex-center gap-4 border-t border-gray-100-pt-3">
        <p onClick = {() => handleEdit(post._id)} className="font-inter text-sm green_gradient cursor-pointer">
        Edit
        </p>
        <p onClick = {() => handleDelete(post._id)} className="font-inter text-sm orange_gradient cursor-pointer">
        Delete
        </p>
        </div>
    ) }
    
    </div>
  );
}

export default PromptCard;
