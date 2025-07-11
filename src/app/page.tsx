"use client";
import { FC } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';

const Page: FC = () => {
  return (
    <>
      {/* Desktop View */}
      <div className="min-h-screen w-full bg-black m-0 hidden lg:flex flex-col relative">
        {/* Background pattern */}
        <div
          className="h-screen w-screen fixed z-0"
          style={{
            background: "#000000",
            backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)`,
            backgroundSize: "30px 30px",
          }}
        />

        {/* Foreground content */}
        <div className="relative z-10 items-center flex flex-col min-h-screen">
          {/* Header */}
          <Header />

          {/* Main content: take available space */}
          <main className="flex-grow">
            <HeroSection />
          </main>

          {/* Footer at bottom always */}
        </div>

        {/* Cursor */}
        <CustomCursor />
      </div>

      {/* Mobile View */}
      <div className="h-screen w-screen overflow-hidden flex flex-col items-center justify-between bg-black text-white text-center px-4 lg:hidden">
        <h1 className='text-3xl text-green-400 bg-gray-950 w-screen p-5 font-semibold'>Dalchemy.io</h1>
        <p>Please visit this site on a desktop device for the best experience.</p>
      </div>
    </>
  );
};

export default Page;
