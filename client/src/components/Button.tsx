import React from 'react';
import { PropsWithChildren } from 'react';

interface AnchorProps {
  as: 'a';
  href: string;
}

interface ButtonProps {
  as: 'button';
}

export default function Button({
  children,
  as,
  ...props
}: PropsWithChildren<ButtonProps | AnchorProps>) {
  switch (as) {
    case 'a':
      return <a {...props}>{children}</a>;
    case 'button':
    default:
      return <button {...props}>{children}</button>;
  }
}
