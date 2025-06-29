"use client";
import { FC } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';

const Page: FC = () => {
  return (
    <>
    <div className="min-h-screen w-full bg-black relative m-0 lg:flex md:flex flex-col items-center hidden">
      <div
        className=" h-screen w-screen fixed z-0 py-10"
        style={{
          background: "#000000",
          backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)`,
          backgroundSize: "30px 30px",
        }}
      />
      <main className="flex-grow lg:flex md:flex  flex-col items-center ">
      <Header/>
        

      <HeroSection/>
        </main>
    <CustomCursor/>
      <Footer/>
    </div>
        <div className="h-screen w-screen overflow-hidden flex flex-col items-center justify-between  bg-black text-white text-center px-4">
        <h1 className='text-3xl text-green-400 bg-gray-950 w-screen p-5 font-semibold'>Dalchemy.io</h1>
        <p>Please visit this site on a desktop device for the best experience.</p>
        <div></div>
        </div>

    </>
  );
};

export default Page;
