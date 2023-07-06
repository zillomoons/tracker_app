import { Navigation } from '@/components/Navigation';
import { Switcher } from '@/components/Switcher';

const navItems = [
  { href: '/', label: 'Home', isProtected: false },
  { href: '/blog', label: 'Blog', isProtected: false },
  // { href: '/about', label: 'About', isProtected: false },
  { href: '/profile', label: 'Profile', isProtected: true },
  { href: '/dashboard', label: 'Dashboard', isProtected: true },
];

export const MyHeader = () => {
  return (
    <header>
      <img
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROj8Ls_fG5zLEYD6nDpJpo4Zsg25KLeBaPrQ&usqp=CAU'
        alt='grogu'
      />
      <Navigation navLinks={navItems} />
      <Switcher />
    </header>
  );
};
