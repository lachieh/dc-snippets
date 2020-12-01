import { useState } from 'react';
import logoWrench from '../images/logo-wrench-white.png';
import Profile from './Profile';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuItems = [
    {
      href: '#',
      name: 'Docs',
      active: false,
    },
    {
      href: '#',
      name: 'Dashboard',
      active: true,
    },
  ];

  const user = {
    name: 'Max Hadden',
    email: 'max@jake.com',
    profilePic:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  };

  return (
    <nav className="bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 border-b border-brand border-solid">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/">
                <img
                  className="h-8 w-8"
                  src={logoWrench}
                  alt="DC Snippets API"
                />
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-baseline space-x-4">
                {menuItems.map((item) => (
                  <a
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium text-white ${
                      item.active ? 'bg-brand-darker' : 'hover:bg-brand'
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {user ? (
                <Profile user={user} />
              ) : (
                <a
                  href="/auth/github/login"
                  className="ml-8 whitespace-nowrap px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-brand hover:bg-brand-light"
                >
                  Sign In
                </a>
              )}
            </div>
          </div>
          <div className="flex md:hidden">
            {/* <!-- Mobile menu button --> */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
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
          {menuItems.map((item) => (
            <li>
              <a
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium text-white ${
                  item.active ? 'bg-brand-darker' : 'hover:bg-brand'
                }`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="pt-4 pb-3 border-t border-gray-700">
          {user ? (
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={user.profilePic}
                  alt=""
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">
                  {user.name}
                </div>
                <div className="text-sm font-medium leading-none text-gray-400">
                  {user.email}
                </div>
              </div>
            </div>
          ) : (
            <a
              href="/auth/github/login"
              className="ml-8 whitespace-nowrap px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-brand hover:bg-brand-light"
            >
              Sign In
            </a>
          )}
          <div className="mt-3 px-2 space-y-1">
            <a
              href="/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-brand"
            >
              Your Profile
            </a>
            <a
              href="/logout"
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
