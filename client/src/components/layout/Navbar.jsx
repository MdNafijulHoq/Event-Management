import { LogOut } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import AuthStore from "../../zustandStore/useAuthStore";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { AuthUser, checkCurreentUser, LogOutUser } = AuthStore();
  const navigate = useNavigate();
  console.log("is this Auth", AuthUser);

  useEffect(() => {
    checkCurreentUser();
  }, [checkCurreentUser]);

  const handleLogOut = () => {
    LogOutUser();
    navigate("/");
  };

  const UserDropdown = () => (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={AuthUser.profilePic || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
      >
        <li>
          <Link
            to="/createEvent"
            className="block px-3 py-2 hover:bg-gray-100 rounded-md text-gray-700"
          >
            ➕ Create Event
          </Link>
        </li>
        <li>
          <Link
            to="/event-by-user"
            className="block px-3 py-2 hover:bg-gray-100 rounded-md text-gray-700"
          >
            📋 My Events
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <Link
        to="/"
        className="text-2xl font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient"
      >
        EventHub
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-800 font-semibold text-lg"
              : "text-lg text-gray-700 hover:text-blue-600"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/all-events"
          className={({ isActive }) =>
            isActive
              ? "text-blue-800 font-semibold text-lg"
              : "text-lg text-gray-700 hover:text-blue-600"
          }
        >
          Events
        </NavLink>
        
        {AuthUser && <UserDropdown />}

        {AuthUser ? (
          <div title="Logout">
            <LogOut
              onClick={handleLogOut}
              size={20}
              className="hover:text-red-400 cursor-pointer transition"
            />
          </div>
        ) : (
          <Link to="/signin">
            <button className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
              Login
            </button>
          </Link>
        )}
      </div>
      
      {/* Mobile header (always visible) */}
      <div className="sm:hidden flex items-center gap-4">
        {AuthUser && <UserDropdown />}
        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
        >
          {/* Menu Icon SVG */}
          <svg
            width="21"
            height="15"
            viewBox="0 0 21 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="21" height="1.5" rx=".75" fill="#426287" />
            <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
            <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu (dropdown) */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-800 font-semibold text-lg"
              : "text-lg text-gray-700 hover:text-blue-600"
          }
        >
          Home
        </NavLink>
        
        <NavLink
          to="/all-events"
          className={({ isActive }) =>
            isActive
              ? "text-blue-800 font-semibold text-lg"
              : "text-lg text-gray-700 hover:text-blue-600"
          }
        >
          Events
        </NavLink>

        {AuthUser ? (
          <div title="Logout" className="w-full">
            <button
              onClick={handleLogOut}
              className="flex items-center gap-2 text-gray-700 hover:text-red-400 cursor-pointer transition"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <Link to="/signin" className="w-full">
            <button className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;