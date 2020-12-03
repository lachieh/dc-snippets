import logoType from '../images/digitalcrafts-logo-white-y.png';

export default function PromoBar() {
  return (
    <div className="text-white text-xs bg-brand-darker">
      <div className="max-w-7xl flex justify-center items-center text-center px-4 sm:px-6 lg:px-8 xl:mx-auto">
        <span className="flex items-center">
          <span className="block">A </span>
          <a href="https://digitalcrafts.com/?utm_source=DC%20Snippets%20API&utm_medium=referral&utm_content=promo%20banner">
            <img className="h-8 py-1" src={logoType} alt="DigitalCrafts" />
          </a>
          <span className="block">Project</span>
        </span>
      </div>
    </div>
  );
}
