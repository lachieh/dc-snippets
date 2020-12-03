import DefaultLayout from './Default';
import { Sidebar, MenuItem } from '../components/Sidebar';
import { PropsWithChildren } from 'react';

interface Props {
  menuItems: MenuItem[];
  title: string;
}

export default function WithSidebarLayout({
  menuItems,
  title,
}: PropsWithChildren<Props>) {
  return (
    <DefaultLayout title={title}>
      <div className="flex flex-col md:flex-row">
        <Sidebar items={menuItems} />
        <section className="w-full md:w-9/12 py-8 px-4 bg-white rounded-md shadow-lg">
          Content
        </section>
      </div>
    </DefaultLayout>
  );
}
