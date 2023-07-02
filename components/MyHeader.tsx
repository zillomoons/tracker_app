import { Navigation } from '@/components/Navigation';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

export const MyHeader = () => {
  return (
    <header>
      <Navigation navLinks={navItems} />
    </header>
  );
};
