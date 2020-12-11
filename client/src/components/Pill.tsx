interface Props {
  text: string;
  color: 'brand' | 'rose' | 'lemon';
  icon?: string;
  title?: string;
}

export default function Pill({ title, text, icon, color }: Props) {
  return (
    <span
      className={`flex items-center mt-1 mr-2 px-2 h-6 text-xs rounded-2xl border ${getColorClass(
        color,
      )}`}
      title={title}
    >
      {icon && getIcon(icon)}
      {text}
    </span>
  );
}

function getIcon(icon: string) {
  switch (icon) {
    case 'document':
      return (
        <svg
          className="h-4 mr-1"
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
      );
    case 'calendar':
      return (
        <svg
          className="h-4 mr-1"
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
      );
    case 'trash':
      return (
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
      );
  }
}

function getColorClass(color: 'brand' | 'rose' | 'lemon'): string {
  switch (color) {
    case 'brand':
      return 'border-brand text-brand';
    case 'rose':
      return 'border-rose-dark text-rose-dark';
    case 'lemon':
      return 'border-lemon-dark text-lemon-dark';
    default:
      return '';
  }
}
