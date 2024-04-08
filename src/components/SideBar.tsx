import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBook, faMoneyCheck, faUser, faAngleRight, faAngleLeft, faStar } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const Menus = [
    { title: "Home", icon: faHome, link: "/" },
    { title: "Users", icon: faUsers, link: "/user" },
    { title: "Books", icon: faBook, link: "/book" },
    { title: "Loans", icon: faMoneyCheck, link: "/loan" },
    { title: "Reviews", icon: faStar, link: "/review" },
  ];

  return (
    <div className="flex">
      <div className={` ${isOpen ? "w-72" : "w-20"} bg-purple-700 h-screen p-5 pt-8 relative duration-300`}>
        <button
          className={`absolute cursor-pointer -right-3 top-9 w-7 h-7 border-purple-500 border-2 rounded-full flex items-center justify-center transition duration-300 ${isOpen ? "text-white bg-purple-700" : "text-white bg-purple-700"}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          <FontAwesomeIcon icon={isOpen ? faAngleLeft : faAngleRight} className="text-lg" />
        </button>

        <div className="flex flex-col items-center">
          <FontAwesomeIcon
            icon={faUser}
            className={`cursor-pointer duration-500 text-white ${isOpen ? "rotate-[360deg] text-[1200%] " : "text-3xl text-[300%]"}`}
          />
          <h1 className={`text-white origin-left font-medium text-xl mt-2 duration-200 ${!isOpen && "scale-0"}`}>
            My Library
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-purple-600 text-gray-300 text-sm items-center gap-x-4 mt-2`}
            >
              <Link to={Menu.link} onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={Menu.icon} />
                <span className={`${!isOpen && "hidden"} origin-left duration-200 ml-2`}>
                  {Menu.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default Sidebar;
