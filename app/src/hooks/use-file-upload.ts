import { useCallback, useEffect, useState } from 'react';

import { uploadFile, getDownloadURL } from '~/services/storage';

export function useFileUploadAction() {
  const [percentage, setPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUploadFile = useCallback(
    (path: string, file: File, onSuccess?: (fileURL: string) => any) => {
      setIsLoading(true);
      uploadFile(path, file, {
        onProgress: setPercentage,
        onError: setError,
        onSuccess: (fileURL) => {
          onSuccess && onSuccess(fileURL);
          setIsLoading(false);
        },
      });
    },
    [],
  );

  return { handleUploadFile, percentage, isLoading, error };
}

export function useFileURLFetcher(fileURL: string | null | undefined) {
  const [downloadURL, setDownloadURl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fileURL) return setDownloadURl(null);
    getDownloadURL(fileURL)
      .then(setDownloadURl)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [fileURL]);

  return { downloadURL, isLoading, error };
}
