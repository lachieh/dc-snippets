import CopyInput from './CopyInput';
import { DateTime } from 'luxon';

interface Props {
  title?: string;
  token: string;
  id: number;
  createdAt: Date;
  snippets?: any[];
  deleteProject: (id: number) => Promise<boolean>;
}

export default function ProjectTile({
  title,
  token,
  id,
  createdAt,
  snippets,
  deleteProject,
}: Props) {
  const createdAtDateTime = DateTime.fromJSDate(createdAt);
  return (
    <div className="py-4 px-6">
      <div className="flex flex-col sm:flex-row justify-between">
        <h3 className="font-semibold text-brand text-lg mb-2">
          {title || `Untitled Project (${id})`}
        </h3>
        <div className="flex flex-row h-8 sm:w-1/2 mb-2">
          <label
            className="text-sm mr-2 whitespace-nowrap self-center text-gray-600"
            htmlFor="apikey"
          >
            API Key:
          </label>
          <CopyInput name="apikey" text={token} />
        </div>
      </div>
      <div className="flex flex-wrap text-sm">
        <span className="flex items-center mt-1 mr-2 px-2 py-1 text-xs rounded bg-brand-lighter text-brand">
          <svg
            className="h-5 mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          {createdAtDateTime.toFormat('ff')}
        </span>
        <span className="flex items-center mt-1 mr-2 px-2 py-1 text-xs rounded bg-lemon-light text-lemon-darker">
          <svg
            className="h-5 mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clipRule="evenodd"
            />
          </svg>
          {snippets?.length || 0} Snippet{snippets?.length === 1 ? '' : 's'}
        </span>
        <span className="border-b border-gray-100 mt-3 mb-2 w-full flex-grow self-center xs:mr-2 xs:w-auto"></span>
        <button
          className="flex items-center mt-1 px-2 py-1 text-xs rounded bg-rose-dark text-white hover:bg-rose-darker"
          type="button"
          onClick={() => deleteProject(id)}
        >
          <svg
            className="h-4 mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Delete Project
        </button>
      </div>
    </div>
  );
}
