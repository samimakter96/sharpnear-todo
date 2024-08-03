"use client";

import Todo from "@/components/Todo";
import { useState } from "react";

const Home = () => {
  const [inputData, setInputData] = useState(""); // To handle the current input value
  const [todos, setTodos] = useState([]); // To handle the list of todos

  const submitHandler = (e) => {
    e.preventDefault();

    if (inputData !== "") {
      setTodos([...todos, inputData]);
      setInputData(""); // clear the input field
    }
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md"
      >
        <div className="flex items-center space-x-4">
          <input
            type="text"
            name="title"
            placeholder="Enter Todo"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
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
            {todos.map((item, index) => {
              return (
                <Todo key={index} id={index} title={item} complete={false} />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
