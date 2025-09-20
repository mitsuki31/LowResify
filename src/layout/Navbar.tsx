// A simple navbar with theme toggle button only

import { type JSX } from "react";
import ThemeToggle from "@/components/custom/ThemeToggle";

export default function Navbar({ sticky = true }): JSX.Element {
  return (
    <nav className={`w-full p-4 flex justify-end ${sticky ? 'fixed top-0 z-50' : ''}`}>
      <ThemeToggle />
    </nav>
  );
}
