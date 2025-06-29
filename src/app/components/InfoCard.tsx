"use client";

import { ReactNode } from "react";

interface InfoCardProps {
  heading: string;
  description: string;
  icon: ReactNode;
}

export default function InfoCard({ heading, description, icon }: InfoCardProps) {
  return (
    <div className="bg-[#1B1B1B] rounded-2xl p-6 w-full max-w-sm flex flex-col">
      {/* Icon Circle */}
      <div className="flex items-center justify-center w-18 h-18 rounded-2xl  mb-4">
        {icon}
      </div>

      {/* Heading */}
      <h3 className="text-white text-xl font-bold mb-2">
        {heading}
      </h3>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
