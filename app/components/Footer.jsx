import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">
              My Blog
            </h3>
            <p className="text-gray-400">
              Sharing thoughts and ideas since
              2024.
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">
              Quick Links
            </h3>
            <ul className="text-gray-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/create"
                  className="hover:text-white"
                >
                  Create Post
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-bold mb-2">
              Connect
            </h3>
            <ul className="text-gray-400">
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@myblog.com"
                  className="hover:text-white"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {currentYear} My Blog. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
