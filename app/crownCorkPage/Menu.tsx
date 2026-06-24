'use client';

import Link from "next/link";

export default function Menu() {
  const links = {
    home: {
      name: 'Home',
      href: '/',
    },
    crownCork: {
      name: 'CrownCork',
      href: '/crownCorkPage',
    },
  };

  return (
    <div className="hidden md:flex flex-row items-center gap-8 text-lg font-bold text-white/80 font-sans">
            {Object.values(links).map((link, key) => (
              <Link
                key={key}
                href={link.href}
                className="hover:text-white transition duration-600"
              >
                {link.name}
              </Link>
            ))} 
          </div>
  )
}