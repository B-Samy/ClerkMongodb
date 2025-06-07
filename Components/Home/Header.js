'use client';

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  afterSignOutUrl
} from '@clerk/nextjs';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import '../../app/globals.css';

const links = [
  { href: '/', label: 'Home' },
  { href: '/payments', label: 'Payments' },
  { href: '/about', label: 'About' },
  { href: '/feed', label: 'Feed' },
  { href: '/contact', label: 'Contact' },
  { href: 'admin/contacts', label: 'Dashboard' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">🚀 demoClerk</div>

        <button
          className="burger-btn"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <XMarkIcon className="icon" /> : <Bars3Icon className="icon" />}
        </button>

        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* 👇 Clerk Auth Section */}
          <li>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="nav-linker">Sign In</button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </li>
        </ul>
      </div>
    </nav>
  );
}
