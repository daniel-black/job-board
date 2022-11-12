import { Sono } from '@next/font/google';
import { GlobalNavbar } from './GlobalNavbar';
import './globals.css';

const sono = Sono();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sono.className}`}>
      <head />
      <body>
        <GlobalNavbar />
        {children}
      </body>
    </html>
  );
}
