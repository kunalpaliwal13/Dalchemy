// components/Navbar.tsx

import Link from "next/link";
import { Poppins, Inter } from 'next/font/google'

const poppins = Poppins({
  weight: ['200'], // or whatever weights you need
  style: ['normal'],      // specify 'normal' style
  subsets: ['latin'],
});

const inter = Inter({subsets:["latin"],variable: '--font-inter',weight:['300']})
const Header = () => {
  return (
    <nav className={`${inter.className} bg-[#1D1C1C]/60 backdrop-blur-2xl  text-white w-[60%] rounded-full max-h-17 flex items-center justify-between  shadow-lg mx-4 top-10 px-4 sm:px-8 py-3 fixed`} style={{zIndex:"1000"}}>
      <div className={ `${inter.className} flex flex-col sm:flex-row text-xl items-center justify-between text-white`}>
        
        <div>
         <Link href="/" className="text-xl font-bold mb-2 sm:mb-0 hover:text-gray-300 transition duration-300"> 
          Dalchemy.io</Link></div>
      </div>
        {/* Navigation Links */}
        <div className="flex text-lg ">
        <div className="flex space-x-4 sm:space-x-6 mb-2 sm:mb-0">
          <Link
            href="/"
            className="hover:text-green-300 px-3 py-1 rounded-md transition duration-300"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-green-300 px-3 py-1 rounded-md transition duration-300"
          >
            About us
          </Link>
          <Link
            href="/how-to-use"
            className="hover:text-green-300 px-3 py-1 rounded-md transition duration-300"
          >
            How to use
          </Link>
          <Link
            href="/contact"
            className="hover:text-green-300 px-3 mr-2 py-1 rounded-md transition duration-300"
          >
            Contact us
          </Link>
        </div>

        {/* Call-to-Action Button */}
        <Link
          href="/get-the-code"
          className=" text-green-300  py-1 px-2 rounded-md shadow-md hover:text-gray-300 hover:shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        >
          Get the code
        </Link>
        </div>
    </nav>
  );
};

export default Header;
