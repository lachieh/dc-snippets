import DefaultLayout from '../layouts/Default';
import Sidebar from '../components/Sidebar';

export default function Home() {
  return (
    <DefaultLayout title="Home">
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <section className="w-full md:w-9/12 py-8 px-4 bg-white rounded-md shadow-lg">
          Content
        </section>
      </div>
    </DefaultLayout>
  );
}
