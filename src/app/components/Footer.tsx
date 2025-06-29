"use client";

import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#1B1B1B] text-gray-400 py-10 bottom-0 px-4 mt-20 z-50 pb-10 absolute">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center ">
        {/* Left - Branding */}
        <div className="text-sm">
          &copy; {new Date().getFullYear()} D-Alchemist. All rights reserved.
        </div>

        {/* Center - Links */}
        <div className="flex space-x-6">
          <Link href="/">
            <span className="hover:text-white cursor-pointer">Home</span>
          </Link>
          <Link href="/about">
            <span className="hover:text-white cursor-pointer">About</span>
          </Link>
          <Link href="/contact">
            <span className="hover:text-white cursor-pointer">Contact</span>
          </Link>
        </div>

        {/* Right - Social Icons */}
        <div className="flex space-x-4">
          <a
            href="https://github.com/kunalpaliwal13"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/kunal-paliwal-431072237/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://twitter.com/kunalpaliwall13"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <FaTwitter size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
