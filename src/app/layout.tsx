// src/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'AI Resource Allocation Configurator',
  description: 'Clean, validate, and configure your allocation data with AI',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
