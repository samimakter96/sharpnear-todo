const Todo = ({ id, title, complete, mongoId, completeTodo }) => {
  return (
    <tr className="bg-white border dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-black whitespace-nowrap"
      >
        {id + 1}
      </th>
      <td
        className={`text-gray-700 font-semibold px-6 py-4 ${
          complete ? "line-through" : ""
        }`}
      >
        {title}
      </td>
      <td className="text-black px-6 py-4">
        {complete ? "Completed" : "Pending"}
      </td>
      <td className=" px-6 py-4 flex gap-2">
        <button className="py-2 px-4 bg-red-500 hover:bg-red-700 text-white rounded-md font-semibold transition ease-in-out duration-200">
          Delete
        </button>
        {complete ? (
          ""
        ) : (
          <button onClick={() => completeTodo(mongoId)} className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold transition ease-in-out duration-200">
            Done
          </button>
        )}
      </td>
    </tr>
  );
};

export default Todo;
