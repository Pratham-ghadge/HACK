import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../store/Auth';
import { FaUser, FaEnvelope, FaHome, FaTools } from 'react-icons/fa';

const AdminLayout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex h-screen justify-center items-center">
      <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>;
  }

  if (!user || !user.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-200 p-4">
        <nav>
          <ul>
            <li>
              <NavLink to="/admin/user" className="block py-2 hover:bg-gray-300 flex items-center">
                <FaUser className="mr-2" /> Users
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/contact" className="block py-2 hover:bg-gray-300 flex items-center">
                <FaEnvelope className="mr-2" /> Contacts
              </NavLink>
            </li>
            <li>
              <NavLink to="/service" className="block py-2 hover:bg-gray-300 flex items-center">
                <FaTools className="mr-2" /> Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className="block py-2 hover:bg-gray-300 flex items-center">
                <FaHome className="mr-2" /> Home
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;