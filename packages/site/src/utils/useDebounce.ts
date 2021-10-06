import * as React from "react";

export const useDebounce = <T>(value: T, onChange: (v: T) => unknown, timeMs = 500) => {
  React.useEffect(() => {
    const id = setTimeout(() => {
      onChange(value);
    }, timeMs);
    return () => clearTimeout(id);
  }, [value]);
};
