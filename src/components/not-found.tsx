import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white">404</h1>
        <p className="text-2xl font-semibold text-gray-700 mt-4">
          Oops! Page not found
        </p>
        <p className="text-gray-300 mt-2">
          The page you are looking for doesn't exist.
        </p>
        <div className="mt-4 flex justify-center items-center">
          <Link
            to="/"
            className="w-fit bg-gray-300 px-4 py-3 text-center flex justify-center items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
