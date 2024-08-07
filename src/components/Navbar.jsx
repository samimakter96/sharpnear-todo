'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();

  return (
    <nav className="bg-gray-700 p-4">
      <div className="flex justify-around items-center">
        <h1 className="text-white font-bold">Todo App</h1>
        <ul className="flex gap-10">
          <li
            className={`text-white hover:text-gray-300 hover:border-b-2 hover:border-gray-300 ${
              pathName === "/" ? "border-b-4 border-blue-500" : ""
            }`}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className={`text-white hover:text-gray-300 hover:border-b-2 hover:border-gray-300 ${
              pathName === "/today" ? "border-b-4 border-blue-500" : ""
            }`}
          >
            <Link href="/today">Today</Link>
          </li>
          <li
            className={`text-white hover:text-gray-300 hover:border-b-2 hover:border-gray-300 ${
              pathName === "/completed" ? "border-b-4 border-blue-500" : ""
            }`}
          >
            <Link href="/completed">Completed</Link>
          </li>
          <li
            className={`text-white hover:text-gray-300 hover:border-b-2 hover:border-gray-300 ${
              pathName === "/about" ? "border-b-4 border-blue-500" : ""
            }`}
          >
            <Link href="/about">About</Link>
          </li>
          <li
            className={`text-white hover:text-gray-300 hover:border-b-2 hover:border-gray-300 ${
              pathName === "/contact" ? "border-b-4 border-blue-500" : ""
            }`}
          >
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
