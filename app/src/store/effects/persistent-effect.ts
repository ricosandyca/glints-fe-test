import { AtomEffect } from 'recoil';

export function persistentEffect<T>(key: string): AtomEffect<T> {
  return function ({ onSet, setSelf }) {
    // on init
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    // on set or on update
    onSet((newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    });
  };
}
