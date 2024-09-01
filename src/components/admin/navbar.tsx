import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">Admin Dashboard</div>
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/admin-project"
              className="text-white hover:text-gray-400"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link to="/admin-skills" className="text-white hover:text-gray-400">
              Skills
            </Link>
          </li>
          <li>
            <Link
              to="/admin-experience"
              className="text-white hover:text-gray-400"
            >
              Experience
            </Link>
          </li>
          <li>
            <Link
              to="/admin-user-details"
              className="text-white hover:text-gray-400"
            >
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
