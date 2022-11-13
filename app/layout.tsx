import { Sono } from '@next/font/google';
import { GlobalNavbar } from './GlobalNavbar';
import './globals.css';

const sono = Sono();

export type LayoutProps = {
  children: React.ReactNode,
}

export default function RootLayout(props: LayoutProps) {
  return (
    <html lang="en">
      <head />
      <body className={`min-h-screen w-full`}>
        <GlobalNavbar />
        {props.children}
      </body>
    </html>
  );
}
