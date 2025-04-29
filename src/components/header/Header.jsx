import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const headerLinks = [
    { title: "Home", link: "/" },
    { title: "About", link: "/about" },
    { title: "Services", link: "/services" },
    { title: "Contact Us", link: "/contact-us" },
  ];

  return (
    <header className="bg-gray-100 lg:p-4 p-2">
      <nav className="flex items-center justify-between lg:px-10 px-2">
        <div className="text-xl font-bold">
          <Link to="/" className="lg:text-2xl font-semibold text-lg">
            Navbar
          </Link>
        </div>
        <ul className="flex lg:gap-4 gap-2">
          {headerLinks.map((navItem, idx) => (
            <li key={idx}>
              <Link
                to={navItem.link}
                className="text-black hover:text-gray-700 md:text-sm text-xs font-medium md:font-normal"
              >
                {navItem.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
