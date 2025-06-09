import { useEffect } from 'react';

export function useScrollToTopOnChange(dependency: any) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dependency]);
}