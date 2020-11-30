import { RefObject, useEffect } from 'react';

export function useClickOutside(
  ref: RefObject<HTMLDivElement>,
  callback: (event?: MouseEvent) => any
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, callback]);
}
