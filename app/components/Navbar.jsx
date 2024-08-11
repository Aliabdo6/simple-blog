"use client";

import Link from "next/link";
import {
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useState } from "react";

const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center space-x-2 cursor-pointer group">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg transform rotate-45 group-hover:rotate-180 transition-transform duration-500 ease-in-out"></div>
          <div className="absolute inset-0 bg-white bg-opacity-30 rounded-lg transform rotate-45 scale-75 group-hover:scale-110 transition-transform duration-500 ease-in-out"></div>
          <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
            A
          </span>
        </div>
        <div className="text-white font-bold text-xl tracking-wider">
          <span className="text-blue-400">
            My
          </span>
          <span className="text-purple-400">
            Blog
          </span>
        </div>
      </div>
    </Link>
  );
};

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-purple-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-gray-200 hover:text-white transition duration-300 ease-in-out"
          >
            Home
          </Link>
          {isSignedIn && (
            <Link
              href="/create"
              className="text-gray-200 hover:text-white transition duration-300 ease-in-out"
            >
              Create Post
            </Link>
          )}
          {isSignedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-200">
                {user.firstName}
              </span>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
              />
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
            >
              Sign In
            </Link>
          )}
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <Link
            href="/"
            className="block text-gray-200 hover:text-white py-2 transition duration-300 ease-in-out"
          >
            Home
          </Link>
          {isSignedIn && (
            <Link
              href="/create"
              className="block text-gray-200 hover:text-white py-2 transition duration-300 ease-in-out"
            >
              Create Post
            </Link>
          )}
          {isSignedIn ? (
            <div className="flex items-center space-x-4 py-2">
              <span className="text-gray-200">
                {user.firstName}
              </span>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
              />
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out mt-2"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
