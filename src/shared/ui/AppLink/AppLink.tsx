import Link from 'next/link';
import { ReactNode } from 'react';
import { type UrlObject } from 'url';
import cls from './AppLink.module.scss';

interface AppLinkProps {
  href: string | UrlObject;
  children: ReactNode;
}

export const AppLink = (props: AppLinkProps) => {
  const { children, href } = props;

  return (
    <Link href={href} className={cls.AppLink}>
      {children}
    </Link>
  );
};
