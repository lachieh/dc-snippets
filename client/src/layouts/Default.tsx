import { PropsWithChildren } from 'react';
import NavBar from '../components/NavBar';
import PromoBar from '../components/PromoBar';

function DefaultLayout({ children, title }: PropsWithChildren<Props>) {
  return (
    <div className="min-h-full">
      <PromoBar />
      <NavBar />

      <header className="bg-brand-dark shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-white">
            {title}
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

interface Props {
  title: string;
}

export default DefaultLayout;
