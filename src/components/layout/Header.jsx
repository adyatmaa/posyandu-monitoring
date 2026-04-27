import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export const Header = () => {
  const navLink = [
    { label: "Home", href: "" },
    { label: "Stunting", href: "stunting" },
    { label: "Imunisasi", href: "imunisasi" },
    { label: "Artikel", href: "article" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isArticle = location.pathname.startsWith("/article");

  return (
    <header className="relative">
      <div className="p-4 md:px-10 flex flex-row-reverse md:flex-row items-center md:justify-between justify-end gap-3 bg-transparent backdrop-blur-3xl">
        <div>
          <NavLink to={`/`} className="text-2xl font-medium">
            Posyandu Wadungasih
          </NavLink>
        </div>

        <ul className="hidden md:flex gap-4">
          {navLink.map((item, i) => {
            return (
              <li key={i}>
                <NavLink
                  to={`/${item.href}`}
                  className={({ isActive }) =>
                    isActive ? "font-medium underline" : "text-slate-600"
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>

        <Button
          variant={`ghost`}
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 z-10 bg-transparent backdrop-blur-3xl border-b border-gray-300"
          >
            <ul className="flex flex-col items-center gap-4 py-4">
              {navLink.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={`/${item.href}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
