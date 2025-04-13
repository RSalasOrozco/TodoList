"use client";
import { LogIn, LogOut, Menu, X, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Redirigir si está logueado y en página de login/register
    if (
      !!token &&
      (window.location.pathname === "/login" ||
        window.location.pathname === "/register")
    ) {
      router.push("/dashboard");
    }
  }, []);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      // Logout
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      router.push("/");
    } else {
      // Login
      router.push("/login");
    }
    closeAllMenus();
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setProfileMenuOpen(false);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen((prev) => !prev);
    setMenuOpen(false);
  };

  const closeAllMenus = () => {
    setMenuOpen(false);
    setProfileMenuOpen(false);
  };

  return (
    <header className="bg-black">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link
              href="/"
              className="block text-white font-bold text-xl"
              onClick={closeAllMenus}
            >
              LOGO TL
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    href="/"
                    className="text-white transition hover:text-gray-300"
                    onClick={closeAllMenus}
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-white transition hover:text-gray-300"
                    onClick={closeAllMenus}
                  >
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-white transition hover:text-gray-300"
                    onClick={closeAllMenus}
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <div className="relative hidden md:block">
                  <button
                    type="button"
                    onClick={toggleProfileMenu}
                    className="overflow-hidden rounded-full border border-white shadow-inner bg-gray-700 flex items-center justify-center size-10"
                  >
                    <span className="sr-only">Menú de usuario</span>
                    <User className="size-6 text-white" />
                  </button>

                  {profileMenuOpen && (
                    <div
                      className="absolute end-0 z-10 mt-0.5 w-56 rounded-md border border-gray-700 bg-black shadow-lg"
                      role="menu"
                    >
                      <div className="p-2">
                        <Link
                          href="/dashboard"
                          className="block rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-800"
                          role="menuitem"
                          onClick={closeAllMenus}
                        >
                          Mi perfil
                        </Link>
                        <button
                          onClick={handleAuthClick}
                          className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-white hover:bg-gray-800"
                          role="menuitem"
                        >
                          <LogOut className="size-4" />
                          Cerrar sesión
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleAuthClick}
                  className="hidden md:flex items-center gap-2 rounded-sm bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-gray-200"
                >
                  <LogIn className="size-4" />
                  Iniciar sesión
                </button>
              )}

              <div className="block md:hidden">
                <button
                  onClick={toggleMenu}
                  className="rounded-sm bg-black p-2 text-white transition hover:text-gray-300 border border-white"
                >
                  {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Menú móvil */}
        {menuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
            <div className="space-y-1 px-2">
              <Link
                href="/"
                onClick={closeAllMenus}
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-800"
              >
                Inicio
              </Link>
              <Link
                href="/"
                onClick={closeAllMenus}
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-800"
              >
                Nosotros
              </Link>
              <Link
                href="/"
                onClick={closeAllMenus}
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-800"
              >
                Contacto
              </Link>
              <button
                onClick={handleAuthClick}
                className="w-full flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-left text-white hover:bg-gray-800"
              >
                {isLoggedIn ? (
                  <>
                    <LogOut className="size-4" />
                    Cerrar sesión
                  </>
                ) : (
                  <>
                    <LogIn className="size-4" />
                    Iniciar sesión
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
