import { useEffect, useMemo, useState } from 'react';

export default function useDependentState<T>(dependency: T) {
  const memoizedValue = useMemo(() => {
    if (typeof dependency === 'object')
      return JSON.parse(JSON.stringify(dependency));
    return dependency;
  }, [dependency]);

  const [value, setValue] = useState(memoizedValue);

  useEffect(() => {
    setValue(memoizedValue);
  }, [memoizedValue]);

  return [value, setValue];
}
