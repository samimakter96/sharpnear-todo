"use client"; // Specifies that this is a client-side component

import Todo from "@/components/Todo"; // Import the Todo component
import axios from "axios"; // Import axios for making HTTP requests
import { useEffect, useState } from "react"; // Import React hooks
import { Bounce, ToastContainer, toast } from "react-toastify"; // Import react-toastify for notifications
import "react-toastify/dist/ReactToastify.css"; // Import CSS for react-toastify

const Home = () => {
  // State for managing input data in the form
  const [inputData, setInputData] = useState({
    title: "",
  });
  
  // State for managing the list of todos
  const [todoData, setTodoData] = useState([]);
  
  console.log(todoData); // Log the todo data to the console

  // Function to fetch all todos from the server
  const fetchTodos = async () => {
    const response = await axios.get("/api"); // Make a GET request to the API
    setTodoData(response.data.todos); // Update state with the fetched todos
  };

  // useEffect hook to fetch todos only when the component mounts
  useEffect(() => {
    fetchTodos(); // Fetch todos when the component mounts
  }, []);

  // Function to delete a todo by ID
  const deleteTodo = async (id) => {
    const response = await axios.delete("/api", { params: { mongoId: id } }); // Make a DELETE request to the API
    toast.success(response.data.msg); // Show a success notification
    fetchTodos(); // Refresh the list of todos
  };

  // Function to mark a todo as complete
  const completeTodo = async (id) => {
    const response = await axios.put("/api", {}, { params: { mongoId: id } }); // Make a PUT request to the API
    toast.success(response.data.msg); // Show a success notification
    fetchTodos(); // Refresh the list of todos
  };

  // Function to handle input changes
  const onChangeHandler = (e) => {
    const { name, value } = e.target; // Destructure the input's name and value
    setInputData({ ...inputData, [name]: value }); // Update the state with the new input value
  };

  // Function to handle form submission
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Make a POST request to create a new todo
      const response = await axios.post("/api", inputData);
      toast.success(response.data.msg); // Show a success notification
      setInputData({ title: "" }); // Clear the input field
      await fetchTodos(); // Fetch the updated list of todos
    } catch (error) {
      toast.error("Failed to add todo"); // Show an error notification if the request fails
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      {/* ToastContainer for displaying notifications */}

      <form
        onSubmit={submitHandler}
        className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md"
      >
        <div className="flex items-center space-x-4">
          <input
            type="text"
            name="title"
            placeholder="Enter Todo"
            value={inputData.title}
            onChange={onChangeHandler}
            className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          >
            Add Todo
          </button>
        </div>
      </form>

      <div className="relative overflow-x-auto mt-24 w-[50%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-600 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                SI NO
              </th>
              <th scope="col" className="px-8 py-3">
                Todo
              </th>
              <th scope="col" className="px-8 py-3">
                Status
              </th>
              <th scope="col" className="px-12 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todoData.map((item, index) => {
              return (
                <Todo
                  key={index}
                  id={index}
                  title={item.title}
                  complete={item.isCompleted}
                  mongoId={item._id}
                  completeTodo={completeTodo}
                  deleteTodo={deleteTodo}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
