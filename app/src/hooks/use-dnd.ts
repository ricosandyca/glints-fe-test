import { useCallback } from 'react';
import { DropResult } from 'react-beautiful-dnd';

export function useDND<T>(initialList: T[], onChange?: (newList: T[]) => any) {
  const handleDragStart = useCallback(() => {
    // Add a little vibration if the browser supports it.
    // Add's a nice little physical feedback
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  }, []);

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      // dropped outside the list
      if (!result.destination) return;

      // if the item isn't moved
      if (result.destination.index === result.source.index) return;

      const newList = [...initialList];
      const [removed] = newList.splice(result.source.index, 1);
      newList.splice(result.destination.index, 0, removed);
      onChange && onChange(newList);
    },
    [initialList, onChange],
  );

  return { handleDragStart, handleDragEnd };
}
