"use client";

import Todo from "@/components/Todo";
import axios from "axios";
import { useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Completed = () => {
  // State for managing the list of completed todos
  const [todoData, setTodoData] = useState([]);

  // Function to fetch completed todos from the server
  const fetchCompletedTodos = async () => {
    try {
      const response = await axios.get("/api?completedOnly=true"); // API call with query param
      setTodoData(response.data.todos); // Update state with the fetched todos
    } catch (error) {
      toast.error("Failed to fetch completed todos"); // Show error notification
    }
  };

  // useEffect hook to fetch completed todos only when the component mounts
  useEffect(() => {
    fetchCompletedTodos(); // Fetch completed todos when the component mounts
  }, []);

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
                  completeTodo={null} // No action needed for completed todos
                  deleteTodo={null} // No action needed for completed todos
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Completed;
