import DefaultLayout from '../layouts/Default';

export default function Home() {
  return (
    <DefaultLayout title="Home">
      <div className="flex">
        <nav className="w-3/12 py-6 pr-4">
          <div className="hidden md:block">
            <ul>
              <li>
                <a
                  className="block font-bold text-lg px-2 py-2 mb-2 rounded-lg text-brand bg-brand-lighter"
                  href="/dashboard"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  className="block font-bold text-lg px-2 py-2 mb-2 rounded-lg hover:bg-brand-light hover:text-white"
                  href="/projects"
                >
                  Projects
                </a>
              </li>
            </ul>
          </div>
          <div className="md:hidden">
            <button className="">Active Link</button>
            <ul className="">
              <li>
                <a href="/dashboard">Dashboard</a>
              </li>
              <li>
                <a href="/projects">Projects</a>
              </li>
            </ul>
          </div>
        </nav>
        <section className="w-9/12 py-8 px-4 bg-white rounded-md shadow-lg">
          Content
        </section>
      </div>
    </DefaultLayout>
  );
}
