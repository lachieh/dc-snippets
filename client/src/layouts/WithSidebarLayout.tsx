import DefaultLayout from './Default';
import { MenuItem, Sidebar } from '../components/Sidebar';
import { PropsWithChildren } from 'react';

interface Props {
  menuItems: MenuItem[];
  title: string;
  noMargin?: boolean;
  noBg?: boolean;
}

export default function WithSidebarLayout({
  menuItems,
  title,
  children,
  noMargin,
  noBg,
}: PropsWithChildren<Props>) {
  let sectionClasses = 'w-full md:w-9/12 ';
  sectionClasses += noBg ? '' : 'bg-white rounded-md shadow-lg';
  sectionClasses += noMargin ? '' : 'py-8 px-4';
  return (
    <DefaultLayout title={title}>
      <div className="flex flex-col md:flex-row items-start">
        <Sidebar items={menuItems} />
        <section className={sectionClasses}>{children}</section>
      </div>
    </DefaultLayout>
  );
}
