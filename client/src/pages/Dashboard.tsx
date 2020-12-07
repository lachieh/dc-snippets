import WithSidebarLayout from '../layouts/WithSidebarLayout';

export default function Dashboard() {
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
    <WithSidebarLayout title="Dashboard" menuItems={menuItems}>
      Content
    </WithSidebarLayout>
  );
}