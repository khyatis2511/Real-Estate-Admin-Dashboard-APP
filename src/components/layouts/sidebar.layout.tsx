import { type FC, ReactNode, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logoutAPI } from '../../lib/api/auth.api';
import { toasterConfig } from '../contexts/layoutContext';

interface SidebarLayoutProps {
  children: ReactNode;
}

const SidebarLayout: FC<SidebarLayoutProps> = ({ children }) => {
  const [isManageUsersOpen, setIsManageUsersOpen] = useState(false);
  const navigate = useNavigate()
    const [, , removeCookie] = useCookies(['auth'])
  

  const toggleManageUsers = () => {
    setIsManageUsersOpen((prev) => !prev);
  };

  const handleLogout = async () => {
   try {
    const userData = await logoutAPI()
      if (userData?.success) {
      toast.success(userData?.message, toasterConfig)
      navigate('/login')
      removeCookie('auth');
      }
    } catch (error: any) {
      console.error('Get login user data initial:', error)
      toast.error(error.message, toasterConfig)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-4">
          <Link
            to="/"
            className="text-xl font-bold text-gray-800 hover:bg-gray-100"
          >
            Real Estate
          </Link>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            <li>
              <button
                onClick={toggleManageUsers}
                className="w-full text-left px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                Manage Users
              </button>
              {/* Sub-menu for New User and Existing User */}
              {isManageUsersOpen && (
                <ul className="pl-6 space-y-2 mt-2">
                  <li>
                    <Link
                      to="/new-users"
                      className="block px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                    >
                      New User
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/existing-users"
                      className="block px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                    >
                      Existing User
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link
                to="/activity-logs"
                className="block px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                Activity Logs
              </Link>
            </li>
            {/* <li>
              <Link
                to="/settings"
                className="block px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                Settings
              </Link>
            </li> */}
            <li>
              <Link
                to="!#"
                onClick={handleLogout}
                className="block px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold text-gray-800">Welcome</h1>
            <button className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        {/* Children Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default SidebarLayout;
