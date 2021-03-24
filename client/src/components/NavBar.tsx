import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logoWrench from '../images/logo-wrench-white.png';
import Profile from './Profile';
import { useUser } from './UserContext';
import useApi from '../api';

export default function NavBar() {
  const [{ user }] = useUser();
  const apiService = useApi();
  const loginUrl = apiService.getLoginUrl();
  const logoutUrl = apiService.getLoginUrl();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuItems = [
    {
      to: '/',
      name: 'Home',
      exact: true,
      private: false,
    },
    {
      to: '/docs',
      name: 'Docs',
      exact: false,
      private: false,
    },
    {
      to: '/tools/snippets',
      name: 'My Snippets',
      exact: false,
      private: true,
    },
  ];

  return (
    <nav className="bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 border-b border-brand-darker border-solid">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/">
                <img
                  className="h-8 w-8"
                  src={logoWrench}
                  alt="DC Snippets API"
                />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-baseline space-x-4">
                {menuItems.map(
                  (item, index) =>
                    ((user && item.private) || // private but logged in
                      !item.private) && ( // not a private item
                      <Link
                        key={index}
                        to={item.to}
                        className={`px-3 py-2 rounded-md text-sm font-medium text-white ${
                          location.pathname.match(
                            item.exact ? new RegExp(`^${item.to}$`) : item.to,
                          )
                            ? 'bg-brand-darker'
                            : 'hover:bg-brand'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ),
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {user ? (
                <Profile user={user} />
              ) : (
                <form action={loginUrl} method="POST">
                  <button
                    type="submit"
                    className="ml-8 whitespace-nowrap px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-brand hover:bg-brand-light"
                  >
                    Sign In
                  </button>
                </form>
              )}
            </div>
          </div>
          <div className="flex md:hidden">
            {/* <!-- Mobile menu button --> */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-brand-darker inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-brand focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'}`}>
        <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.to}
                className={`block px-3 py-2 rounded-md text-base font-medium text-white ${
                  location.pathname.match(item.to)
                    ? 'bg-brand-darker'
                    : 'hover:bg-brand'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="pt-4 pb-3 bg-brand-darker">
          {user ? (
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={user.profile.photos?.[0].value || ''}
                  alt=""
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">
                  {user.displayName}
                </div>
                {user.profile.emails?.[0].value && (
                  <div className="text-sm font-medium leading-none text-gray-400">
                    {user.profile.emails[0].value}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <form action={loginUrl} method="POST">
              <button
                type="submit"
                className="ml-5 whitespace-nowrap px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-brand hover:bg-brand-light"
              >
                Sign In
              </button>
            </form>
          )}
          <div className="mt-3 px-2 space-y-1">
            <NavLink
              exact
              to="/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-brand"
              activeClassName="bg-brand-darker"
            >
              Your Profile
            </NavLink>
            <a
              href={logoutUrl}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-brand"
            >
              Sign out
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
