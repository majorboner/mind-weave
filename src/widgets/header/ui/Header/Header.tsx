import cls from './Header.module.scss';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className={cls.Header}>
      <nav className={cls.links}>
        <Link href={'/'}>Home</Link>
        <Link href={'/editor'}>Editor</Link>
      </nav>
    </header>
  );
};
