import { Schema, model, models } from 'mongoose';

const promptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId, // Corrected reference
    ref: "User" // one user will be able to create many prompts
  },
  prompt: {
    type: String,
    required: [true, 'prompt is required!'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required!'],
  }
});

const Prompt = models.Prompt || model("Prompt", promptSchema);

export default Prompt;
