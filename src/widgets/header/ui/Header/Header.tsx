import { AppLink } from '@/shared/ui/AppLink/AppLink';
import cls from './Header.module.scss';

export const Header = () => {
  return (
    <header className={cls.Header}>
      <nav className={cls.links}>
        <AppLink href={'/'}>Home</AppLink>
        <AppLink href={'/editor'}>Editor</AppLink>
      </nav>
    </header>
  );
};
