
const Navbar = () => {
  return (
    <nav className="bg-gray-700 p-4">
      <div className="flex justify-around items-center ">
        <h1 className="text-white font-bold">Todo App</h1>
        <ul className="flex gap-10">
          <li className="text-white">Home</li>
          <li className="text-white">About</li>
          <li className="text-white">Contact</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
