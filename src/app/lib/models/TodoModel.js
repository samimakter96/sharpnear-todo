// Import the mongoose library
const { default: mongoose } = require("mongoose");

// Define a new schema for the Todo model
const Schema = new mongoose.Schema(
  {
    // Define a title field of type String, which is required
    title: {
      type: String,
      required: true,
    },
    // Define an isCompleted field of type Boolean, which defaults to false and is required
    isCompleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    // Enable timestamps to automatically add createdAt and updatedAt fields to the schema
    timestamps: true,
  }
);

// Check if the 'todo' model already exists, if not, create a new model using the defined schema
const TodoModel = mongoose.models.todo || mongoose.model('todo', Schema);

// Export the TodoModel as the default export
export default TodoModel;
