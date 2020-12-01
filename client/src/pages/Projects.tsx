import DefaultLayout from '../layouts/Default';
import Sidebar from '../components/Sidebar';

export default function Projects() {
  const menuItems = [
    {
      name: 'Dashboard',
      href: '/app/dashboard',
    },
    {
      name: 'Projects',
      href: '/app/projects',
    },
  ];
  return (
    <DefaultLayout title="Projects">
      <div className="flex flex-col md:flex-row">
        <Sidebar items={menuItems} />
        <section className="w-full md:w-9/12 py-8 px-4 bg-white rounded-md shadow-lg">
          Content
        </section>
      </div>
    </DefaultLayout>
  );
}
