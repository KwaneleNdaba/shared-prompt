import PromptCard from "./PromptCard"
function MyProfile({
  name,
desc,
data,
handleDelete,
handleEdit
}) {
  return (
  <section className="w-full">
    <h1 className="head_text text-left">
    <span className="blue_gradient">
    {name} Profile
    </span>
    </h1>
    <p className="desc text-left">{desc}</p>
    <div className="mt-10 prompt_layout">
    {data.map(prompt => (
      <PromptCard key = {prompt._id} 
      post = {prompt}
      handleEdit= {handleEdit && handleEdit} 
      handleDelete={handleDelete && handleDelete} 
      />
      
    ))}
    </div>
  </section>
  )
}

export default MyProfile
