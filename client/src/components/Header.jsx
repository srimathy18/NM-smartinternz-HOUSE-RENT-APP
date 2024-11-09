import { FaSearch } from 'react-icons/fa'; // Font Awesome icons
import { Link, useNavigate } from 'react-router-dom'; // Link to navigate between pages
import { useSelector } from 'react-redux'; // To get data from Redux store
import { useEffect, useState } from 'react'; // React hooks for state and lifecycle

export default function Header() {
  // Extract the current user from the Redux store
  const { currentUser } = useSelector((state) => state.user);

  // State for the search functionality
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // useNavigate to programmatically navigate between routes

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission and update the URL with the search term
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`); // Navigate to the search results page
  };

  useEffect(() => {
    // Update the searchTerm state based on the search term in the URL
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="bg-pink-400 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        {/* Home link */}
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-blue-300">Rent</span>
            <span className="text-green-300">Ease</span>
          </h1>
        </Link>

        {/* Search Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          />
          <button>
            <FaSearch className="text-blue-300" />
          </button>
        </form>

        {/* Navigation Links */}
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-orange-200 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-orange-200 hover:underline">
              About
            </li>
          </Link>

          {/* Profile or Sign In */}
          <Link to="/profile">
            {currentUser ? ( // Check if the user is logged in
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : ( // If user is not logged in, show Sign In link
              <li className="text-orange-200 hover:underline">Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
