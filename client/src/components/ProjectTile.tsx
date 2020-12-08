import { createRef, MouseEvent, useState } from 'react';
import { setTimeout } from 'timers';
import Tooltip from './Tooltip';

interface Props {
  title?: string;
  token: string;
  id: number;
  createdAt: Date | string;
  snippets?: any[];
}

export default function ProjectTile({
  title,
  token,
  id,
  createdAt,
  snippets,
}: Props) {
  const tokenRef = createRef<HTMLInputElement>();
  const [showTooltip, setShowTooltip] = useState(false);

  const copyText = (e: MouseEvent) => {
    tokenRef.current?.select();
    document.execCommand('copy');
    (e.target as HTMLElement)?.focus();
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 3000);
  };

  return (
    <div className="py-4 px-6">
      <div className="flex justify-between mb-2">
        <h3 className="font-semibold text-brand">
          {title ?? `Project ${id}}`}
        </h3>
        <div className="flex flex-row border border-gray-400 h-6 w-1/2 rounded relative focus-within:ring-4 focus-within:ring-brand-light focus-within:ring-opacity-50">
          <input
            type="text"
            className="bg-transparent h-full w-full text-sm text-gray-500 p-2 focus:outline-none"
            value={token}
            onClick={copyText}
            ref={tokenRef}
          />
          <button
            onClick={copyText}
            className="border-l border-gray-400 h-full px-1"
          >
            <span className="sr-only">Copy Token to Clipboard</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-4 w-4"
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
          <Tooltip text="Token copied!" isVisible={showTooltip} />
        </div>
      </div>
      <div className="flex text-sm">
        <span>{createdAt.toLocaleString()}</span>
        <span className="ml-auto px-2 py-1 text-xs rounded bg-lemon-light text-lemon-darker">
          {snippets?.length || 0} Snippets
        </span>
      </div>
    </div>
  );
}
