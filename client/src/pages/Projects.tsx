import { MenuItem } from '../components/Sidebar';
import WithSidebarLayout from '../layouts/WithSidebarLayout';

export default function Projects() {
  const menuItems: MenuItem[] = [
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
    <WithSidebarLayout title="Projects" menuItems={menuItems}>
      Content
    </WithSidebarLayout>
  );
}
