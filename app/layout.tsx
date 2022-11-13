import { GlobalNavbar } from './GlobalNavbar';
import './globals.css';

export type LayoutProps = {
  children: React.ReactNode,
}

export default function RootLayout(props: LayoutProps) {
  return (
    <html lang="en">
      <head />
      <body className={`min-h-screen w-full selection:bg-yellow-400 selection:text-black`}>
        <GlobalNavbar />
        {props.children}
      </body>
    </html>
  );
}
