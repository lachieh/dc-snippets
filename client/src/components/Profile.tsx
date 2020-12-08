import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';
import useApi, { User } from '../api';

interface Props {
  user: User;
}

export default function Profile(props: Props) {
  const apiService = useApi();
  const logoutUrl = apiService.getLogoutUrl();
  const { user } = props;
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const variants = {
    open: {
      opacity: 1,
      transform: 'scale(1)',
      rotate: 0,
    },
    closed: {
      opacity: 0,
      rotate: 5,
      transform: 'scale(0.95)',
    },
  };

  useClickOutside(menuRef, () => {
    setOpen(false);
  });

  const transition = { duration: 0.1 };

  return (
    <div className="ml-3 relative" ref={menuRef}>
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          id="user-menu"
          aria-haspopup="true"
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src={user.profile.photos?.[0].value || ''}
            alt=""
          />
        </button>
      </div>
      <motion.div
        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 pt-0 bg-white ring-1 ring-black ring-opacity-5"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
        animate={open ? 'open' : 'closed'}
        initial="closed"
        variants={variants}
        transition={transition}
      >
        <span className="block px-4 py-2 text-sm font-bold text-brand-dark bg-brand-light rounded-t-md">
          {user.displayName}
        </span>
        <a
          href="/profile"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          Your Profile
        </a>
        <a
          href={logoutUrl}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          Sign out
        </a>
      </motion.div>
    </div>
  );
}
