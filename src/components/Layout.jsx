import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  const { logout, user } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
        <div>
          <h2 className="text-2xl font-bold mb-8">ProjectFlow</h2>

          <nav className="space-y-4">
            <Link
              to="/dashboard"
              className="block text-gray-700 hover:text-blue-600"
            >
              Dashboard
            </Link>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto border-t pt-4">
          <p className="text-sm text-gray-500">{user?.name}</p>

          <button
            onClick={logout}
            className="mt-2 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
};

export default Layout;
