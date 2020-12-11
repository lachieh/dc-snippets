import React, { createRef, MouseEvent, useState } from 'react';
import Tooltip from './Tooltip';

interface Props {
  text: string;
  name: string;
}

export default function CopyInput({ text, name }: Props) {
  const inputRef = createRef<HTMLInputElement>();
  const [showTooltip, setShowTooltip] = useState(false);

  const copyText = (e: MouseEvent) => {
    inputRef.current?.select();
    document.execCommand('copy');
    (e.target as HTMLElement)?.focus();
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 3000);
  };
  return (
    <div className="w-full flex border text-gray-500  focus-within:ring-4 focus-within:ring-brand-light focus-within:ring-opacity-50 border-gray-400 rounded relative">
      <input
        type="text"
        className="bg-transparent h-full w-full text-sm p-2 pr-0 focus:outline-none"
        value={text}
        onClick={copyText}
        ref={inputRef}
        readOnly
        name={name}
      />
      <button
        onClick={copyText}
        className="border-l border-gray-400 h-full px-1"
      >
        <span className="sr-only">Copy to Clipboard</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="h-5 w-6"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
          />
        </svg>
      </button>

      <Tooltip text="Copied!" isVisible={showTooltip} />
    </div>
  );
}
