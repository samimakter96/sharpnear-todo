import { NextResponse } from "next/server"; // Import NextResponse for sending responses in Next.js API routes
import { ConnectDB } from "../lib/config/db"; // Import function to connect to the database
import TodoModel from "../lib/models/TodoModel"; // Import the Todo model

// Initialize the database connection when the module is loaded
const LoadDB = async () => {
  await ConnectDB(); // Connect to the database
};

// Call LoadDB to ensure the database connection is established
LoadDB();

// Handle GET requests to fetch todos
export async function GET(request) {
  // Retrieve the value of the "incompleteOnly" query parameter from the request URL
  const incompleteOnly = request.nextUrl.searchParams.get("incompleteOnly");

  // Retrieve the value of the "completedOnly" query parameter from the request URL
  const completedOnly = request.nextUrl.searchParams.get("completedOnly");

  // Initialize an empty query object
  let query = {};

  // Check if "incompleteOnly" query parameter is set to "true"
  if (incompleteOnly === "true") {
    // If true, set the query to find todos where "isCompleted" is false
    query = { isCompleted: false };
  } 
  // Check if "completedOnly" query parameter is set to "true"
  else if (completedOnly === "true") {
    // If true, set the query to find todos where "isCompleted" is true
    query = { isCompleted: true };
  }

  // Fetch todos from the database based on the constructed query
  const todos = await TodoModel.find(query);

  // Return the fetched todos as a JSON response
  return NextResponse.json({ todos });
}

// Handle POST requests to create a new todo
export async function POST(request) {
  const { title } = await request.json(); // Parse the JSON request body to get the title of the new todo
  await TodoModel.create({ title }); // Create a new todo in the database with the given title

  return NextResponse.json({ msg: "Todo Created" }); // Return a success message as a JSON response
}

// Handle DELETE requests to delete a todo
export async function DELETE(request) {
  const mongoId = await request.nextUrl.searchParams.get("mongoId"); // Get the mongoId query parameter to identify which todo to delete
  await TodoModel.findByIdAndDelete(mongoId); // Find and delete the todo with the specified ID from the database

  return NextResponse.json({ msg: "Todo Deleted" }); // Return a success message as a JSON response
}

// Handle PUT requests to update a todo
export async function PUT(request) {
  const mongoId = await request.nextUrl.searchParams.get("mongoId"); // Get the mongoId query parameter to identify which todo to update
  await TodoModel.findByIdAndUpdate(mongoId, { // Find the todo with the specified ID and update it
    $set: {
      isCompleted: true, // Set the isCompleted field to true
    },
  });

  return NextResponse.json({ msg: "Todo Completed" }); // Return a success message as a JSON response
}
