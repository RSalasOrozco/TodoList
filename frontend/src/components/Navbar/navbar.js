"use client";

import { useState } from "react";
import { LogIn, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAuthClick = () => {
    setIsLoggedIn((prev) => !prev);
    setMenuOpen(false); // cerrar menú si se hace login/logout
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="w-full bg-gray-950 backdrop-blur-md shadow-md px-4 py-3 flex items-center justify-between relative">
      <div className="text-xl font-bold text-white">
        <Link href="/">LOGO TL</Link>
      </div>

      {/* Menú Hamburguesa */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Links - Desktop */}
      <div className="hidden md:flex items-center gap-6 text-white">
        <Link href="/">Inicio</Link>
        <Link href="/">Nosotros</Link>
        <Link href="/">Contacto</Link>
      </div>

      {/* Botón Login/Logout */}
      <div className="hidden md:flex">
        <button
          onClick={handleAuthClick}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          {isLoggedIn ? (
            <>
              <LogOut size={18} />
              LOGOUT
            </>
          ) : (
            <>
              <LogIn size={18} />
              LOGIN
            </>
          )}
        </button>
      </div>

      {/* Menú desplegable - Mobile */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-950 text-white flex flex-col items-start p-4 gap-4 md:hidden z-10 shadow-lg rounded-md">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Inicio
          </Link>
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Nosotros
          </Link>
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Contacto
          </Link>

          <button
            onClick={handleAuthClick}
            className="flex items-center gap-2 bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition w-full"
          >
            {isLoggedIn ? (
              <>
                <LogOut size={18} />
                LOGOUT
              </>
            ) : (
              <>
                <LogIn size={18} />
                LOGIN
              </>
            )}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
