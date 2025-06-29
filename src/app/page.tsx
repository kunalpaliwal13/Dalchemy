"use client";
import { FC } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';

const Page: FC = () => {
  return (
    <div className="min-h-screen w-full bg-black relative m-0 flex flex-col items-center">
      <div
        className=" h-screen w-screen fixed z-0 py-10"
        style={{
          background: "#000000",
          backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)`,
          backgroundSize: "30px 30px",
        }}
      />
      <main className="flex-grow flex flex-col items-center">
      <Header/>
        

      <HeroSection/>
        </main>
    <CustomCursor/>
      <Footer/>
    </div>
  );
};

export default Page;
