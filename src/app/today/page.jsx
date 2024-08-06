"use client";

import Todo from "@/components/Todo"; // Import the Todo component
import axios from "axios"; // Import axios for making HTTP requests
import { useEffect, useState } from "react"; // Import React hooks
import { Bounce, ToastContainer, toast } from "react-toastify"; // Import react-toastify for notifications
import "react-toastify/dist/ReactToastify.css"; // Import react-toastify styles

// Utility function to format the date
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }; // Formatting options
  return date.toLocaleDateString(undefined, options); // Return formatted date
};

const Today = () => {
  const [todoData, setTodoData] = useState([]); // State to store todo data
  const today = new Date(); // Get today's date
  const formattedDate = formatDate(today); // Format today's date

  // Function to fetch incomplete todos
  const fetchIncompleteTodos = async () => {
    try {
      const response = await axios.get("/api?incompleteOnly=true"); // Fetch todos with isCompleted: false
      setTodoData(response.data.todos); // Set the fetched todos to state
    } catch (error) {
      toast.error("Failed to fetch todos"); // Show error toast if fetching fails
    }
  };

  // useEffect hook to fetch incomplete todos when the component mounts
  useEffect(() => {
    fetchIncompleteTodos(); // Fetch incomplete todos on component mount
  }, []);

  // Function to mark a todo as complete
  const completeTodo = async (id) => {
    try {
      const response = await axios.put("/api", {}, { params: { mongoId: id } }); // Mark todo as complete
      toast.success(response.data.msg); // Show success toast
      fetchIncompleteTodos(); // Refetch incomplete todos to update the list
    } catch (error) {
      toast.error("Failed to complete todo"); // Show error toast if updating fails
    }
  };

  return (
    <>
      {/* ToastContainer for showing toast notifications */}
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

      <div className="container mx-auto p-4">
        {/* Display today's date */}
        <h1 className="flex items-center justify-center mt-5 text-2xl font-bold mb-4">
          Today {formattedDate}
        </h1>
        
        <div className="relative overflow-x-auto mt-6 w-[50%] mx-auto">
          {/* Table to display todos */}
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-600 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">SI NO</th>
                <th scope="col" className="px-8 py-3">Todo</th>
                <th scope="col" className="px-8 py-3">Status</th>
                <th scope="col" className="px-12 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Map over todoData and render Todo components */}
              {todoData.map((item, index) => (
                <Todo
                  key={index}
                  id={index}
                  title={item.title}
                  complete={item.isCompleted}
                  mongoId={item._id}
                  completeTodo={completeTodo}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Today;
