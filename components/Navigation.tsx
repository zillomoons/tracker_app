'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

type NavLink = {
  href: string;
  label: string;
  isProtected: boolean;
};

export const Navigation = ({ navLinks }: { navLinks: NavLink[] }) => {
  const pathname = usePathname();
  const session = useSession();
  return (
    <div>
      {navLinks
        .filter((link) => !link.isProtected)
        .map((link) => {
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
      {session.data &&
        navLinks
          .filter((link) => link.isProtected)
          .map((link) => {
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
      {session.data ? (
        <Link href='#' onClick={() => signOut({ callbackUrl: '/' })}>
          Sign Out
        </Link>
      ) : (
        <Link href='/signin'>Singin</Link>
      )}
    </div>
  );
};
