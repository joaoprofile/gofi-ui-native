import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';
const HOME = 'introduction';

function readHash(): string {
  if (!isWeb) return HOME;
  return window.location.hash.replace(/^#\/?/, '') || HOME;
}

/** Hash-based routing on web; plain state on native. */
export function useRoute(): [string, (id: string) => void] {
  const [route, setRoute] = useState<string>(readHash);

  useEffect(() => {
    if (!isWeb) return;
    const onChange = () => setRoute(readHash());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const navigate = useCallback((id: string) => {
    if (isWeb) window.location.hash = `/${id}`;
    setRoute(id);
  }, []);

  return [route, navigate];
}
