import Link from "next/link";
import React from "react";

function Form({
  type,
  post,
  setPost,
  submitting,
  setSubmitting,
  handleSubmit,
}) {
  return (
    <section className="w-full max-x-full flex-start flex-col">
      <h1 className="head_text text-left blue_gradient">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} amazing prompt with the world and let your imagination run wild
        with any AI-powered platform
      </p>

      <form
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        onSubmit={handleSubmit}
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-7">
            Your AI prompt
          </span>
        </label>

        <textarea
          value={post.prompt}
          onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          placeholder="Write your prompt"
          required={true}
          className="form_textarea"
        />

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-7">
            Tag
          </span>
          <span className="font-normal">(#web-development)</span>
        </label>

        <input
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
          placeholder="#tag"
          required={true}
          className="form_input"
        />
        <div className = "flex-end mx-3 mb-5 gap-4">
          <Link href="/" className = "text-gray-500 text-sm">
          Cancel
          </Link>
          <button type="submit"
          className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          disabled={submitting}>
            {
              submitting ? `${type}...` : type 
            }

          </button>
        </div>
      </form>
    </section>
  );
}

export default Form;
