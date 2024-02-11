import { useEffect, useRef } from "react";

export default function useDebounce(fn, delay) {
  const timeoutId = useRef();
  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);
  return (...args) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
