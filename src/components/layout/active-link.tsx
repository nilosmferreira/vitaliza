import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement, HTMLProps, ReactElement } from 'react';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}
interface DivChildrenProps extends HTMLProps<HTMLDivElement> {
  'data-active': string;
}

export function ActiveLink({
  children,
  shouldMatchExactHref = true,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();

  let isActive = false;

  if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true;
  }

  if (
    !shouldMatchExactHref &&
    (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))
  ) {
    isActive = true;
  }

  return (
    <Link {...rest}>
      {cloneElement<DivChildrenProps>(children, {
        'data-active': `${isActive}`,
      })}
    </Link>
  );
}
