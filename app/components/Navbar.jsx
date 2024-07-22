"use client";

import Link from "next/link";
import {
  UserButton,
  useUser,
} from "@clerk/nextjs";

const Navbar = () => {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-white text-xl font-bold"
        >
          My Blog
        </Link>
        <div className="flex items-center">
          <Link
            href="/"
            className="text-gray-300 hover:text-white mr-4"
          >
            Home
          </Link>
          {isSignedIn && (
            <Link
              href="/create"
              className="text-gray-300 hover:text-white mr-4"
            >
              Create Post
            </Link>
          )}
          {isSignedIn ? (
            <div className="flex items-center">
              <span className="text-gray-300 mr-2">
                {user.firstName}
              </span>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="text-gray-300 hover:text-white"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
