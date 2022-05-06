import { useCallback, useEffect } from 'react';

import appConfig from '~/config/app';

export function useDocumentTitle(prefix: string | null | undefined) {
  const resetDocumentTitle = useCallback(() => {
    document.title = `${appConfig.appName}`;
  }, []);

  useEffect(() => {
    if (!prefix || prefix.trim() === '') return resetDocumentTitle();

    document.title = `${prefix} • ${appConfig.appName}`;
    // reset to default title on unmount
    return resetDocumentTitle;
  }, [prefix]);
}
