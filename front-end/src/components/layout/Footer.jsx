import { useState } from "react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import Logo from "../ui/Logo";

function FooterSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Title with toggle on mobile */}
      <div className="flex justify-between items-center lg:block">
        <h4
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-lg font-semibold cursor-pointer lg:cursor-default"
        >
          {title}
        </h4>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="lg:hidden text-xl"
        >
          {isOpen ? <HiChevronUp /> : <HiChevronDown />}
        </button>
      </div>

      {/* Links */}
      <ul
        className={`mt-2 space-y-2 text-sm transition-all duration-300 ${
          isOpen ? "block" : "hidden"
        } lg:block`}
      >
        {children}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 ">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 justify-items-center">
          {/* Logo / About */}
          <div className="flex flex-col items-center text-center ">
            <Logo />
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Your favorite place to book padel courts, stay updated with blogs,
              and connect with the community.
            </p>
          </div>

          {/* Links Section */}
          <FooterSection title="Quick Links">
            <li>
              <a href="/" className="hover:text-[#009c85]">
                Home
              </a>
            </li>
            <li>
              <a href="/courts" className="hover:text-[#009c85]">
                Courts
              </a>
            </li>
            <li>
              <a href="/blogs" className="hover:text-[#009c85]">
                Blogs
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-[#009c85]">
                About
              </a>
            </li>
          </FooterSection>

          <FooterSection title="Resources">
            <li>
              <a href="/privacy" className="hover:text-[#009c85]">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-[#009c85]">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/support" className="hover:text-[#009c85]">
                Support
              </a>
            </li>
          </FooterSection>

          <FooterSection title="Connect">
            <div className="flex space-x-4 mt-2">
              <a
                href="https://github.com/Usif-Wagdy"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#009c85] text-xl"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com/in/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#009c85] text-xl"
              >
                <FaLinkedinIn />
              </a>
              <a href="#" className="hover:text-[#009c85] text-xl">
                <FaFacebookF />
              </a>
            </div>
          </FooterSection>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-gray-300 dark:border-gray-700 pt-6 text-sm text-center">
          &copy; {new Date().getFullYear()} Padelo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
