import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(/search?${searchQuery});
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-[#3B82F6] shadow-lg">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to="/">
          <h1 className="font-extrabold text-lg sm:text-2xl flex flex-wrap">
            <span className="text-yellow-300">Rentify</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-200 p-2 rounded-md flex items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64 text-gray-700 placeholder-gray-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-[#333]" />
          </button>
        </form>
        <ul className="flex gap-6">
          <Link to="/">
            <li className="hidden sm:inline text-[#FFFFFF] hover-animation">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-[#FFFFFF] hover-animation">
              About Us
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-8 w-8 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="hidden sm:inline text-[#FFFFFF] hover-animation">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}