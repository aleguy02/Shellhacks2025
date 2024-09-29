import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-black text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            onClick={() => navigate("/")}
            className="flex items-center cursor-pointer"
          >
            <div className="flex-shrink-0">
              <div>
                <div className="w-10 h-10 relative">
                  <img src="./poi.png" alt="Logo" className="object-cover" />
                </div>
              </div>
            </div>
            <div className="ml-2 font-bold text-xl">
              <span>FIN</span>
              <span>ATLAS</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                onClick={() => navigate("/")}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 cursor-pointer"
              >
                Home
              </a>
              <a
                onClick={() => navigate("/search")}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 cursor-pointer"
              >
                Search
              </a>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              onClick={() => navigate("/")}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            >
              Home
            </a>
            <a
              onClick={() => navigate("/search")}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            >
              Search
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
