'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLink = {
  href: string;
  label: string;
};

export const Navigation = ({ navLinks }: { navLinks: NavLink[] }) => {
  const pathname = usePathname();
  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.label}
            href={link.href}
            className={isActive ? 'active' : ''}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
};
