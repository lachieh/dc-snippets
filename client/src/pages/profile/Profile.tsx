import { Outlet } from 'react-router';
import WithSidebarLayout from '../../layouts/WithSidebarLayout';
import { sideBarItems } from './sidebarItems';

export default function Profile() {
  return (
    <WithSidebarLayout title="Profile" menuItems={sideBarItems}>
      <Outlet />
    </WithSidebarLayout>
  );
}
