"use client";

import Todo from "@/components/Todo";
import axios from "axios";
import { useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [inputData, setInputData] = useState({
    title: ''
  }); 
  const [todoData, setTodoData] = useState([]); 
  console.log(todoData)

  const fetchTodos = async () => {
    const response = await axios.get('/api')
    setTodoData(response.data.todos)

  }

  // because i want this function to be executed only first time, when the webpage is loaded
  useEffect(() => {
    fetchTodos()
  }, [])


  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    setInputData({...inputData, [name]: value})
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // api code
      const response = await axios.post('/api', inputData)
      toast.success(response.data.msg)
      // clear the input fields
      setInputData({title: ''})
      // fetch the updated todos
      await fetchTodos()
    } catch (error) {
      toast.error("Failed to add todo")
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

      <div className="relative overflow-x-auto mt-24 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                SI NO
              </th>
              <th scope="col" className="px-6 py-3">
                Todo
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todoData.map((item, index) => {
              return (
                <Todo key={index} id={index} title={item.title} complete={item.isCompleted} mongoId={item._id}/>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
