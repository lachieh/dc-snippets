import { useState } from 'react';
import logoType from '../images/digitalcrafts-logo-white-y.png';

export default function PromoBar() {
  return (
    <div className="text-white text-xs bg-brand-darker">
      <div className="max-w-7xl flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <span className="flex items-center">
          <span className="block">Made with ❤️ by </span>
          <a href="https://digitalcrafts.com/?utm_source=DC%20Snippets%20API&utm_medium=referral&utm_content=Made%20with%20love">
            <img className="h-8 py-1" src={logoType} alt="DigitalCrafts" />
          </a>
        </span>
      </div>
    </div>
  );
}
