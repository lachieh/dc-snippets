import { useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useClickOutside } from '../hooks/useClickOutside';

interface SidebarProps {
  items: MenuItem[];
}

export interface MenuItem {
  name: string;
  href: string;
}

export function Sidebar({ items }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useClickOutside(menuRef, () => setOpen(false));

  return (
    <nav className="w-full md:w-3/12 pb-2 md:py-6 pr-0 md:pr-4">
      <div className="hidden md:block">
        <ul>
          {items.map((item, i) => (
            <li key={i}>
              <NavLink
                exact
                className={`block font-bold text-brand text-lg px-2 py-2 mb-2 rounded-lg ${
                  location.pathname.match(item.href) ||
                  'hover:bg-brand-light hover:text-white'
                }`}
                activeClassName="text-brand bg-brand-lighter cursor-default"
                to={item.href}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:hidden" ref={menuRef}>
        <button
          onClick={() => {
            setOpen(!open);
          }}
          className="flex w-full justify-between items-center font-bold text-lg px-2 py-2 mb-2 rounded-lg text-brand bg-brand-lighter"
        >
          <span>
            {items.find((item) =>
              location.pathname.match(new RegExp(`^${item.href}$`)),
            )?.name || 'Navigation'}
          </span>
          <svg
            viewBox="0 0 20 20"
            className={`h-6 fill-current transition-transform transform ${
              open && 'rotate-180'
            }`}
          >
            <polygon
              id="Combined-Shape"
              points="9.29289322 12.9497475 10 13.6568542 15.6568542 8 14.2426407 6.58578644 10 10.8284271 5.75735931 6.58578644 4.34314575 8"
            ></polygon>
          </svg>
        </button>
        <ul className={open ? 'block' : 'hidden'}>
          {items
            .filter(
              (item) => !location.pathname.match(new RegExp(`^${item.href}$`)),
            )
            .map((item, i) => (
              <li key={i}>
                <NavLink
                  className="block font-bold text-lg px-2 py-2 mb-2 rounded-lg hover:bg-brand-light hover:text-white"
                  to={item.href}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
}
