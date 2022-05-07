import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

export default function useDependentState<T>(
  dependency: T,
): [T, Dispatch<SetStateAction<T>>] {
  const memoizedValue = useMemo(() => {
    return dependency;
  }, [dependency]);

  const [value, setValue] = useState(memoizedValue);

  useEffect(() => {
    setValue(memoizedValue);
  }, [memoizedValue]);

  return [value, setValue];
}
