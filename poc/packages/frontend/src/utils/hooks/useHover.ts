import { useRef, useState, useEffect } from 'react';

export function useHover<T extends HTMLElement>(ref: React.RefObject<T>) {
  const [value, setValue] = useState(false);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener('pointerover', handleMouseOver);
        node.addEventListener('pointerout', handleMouseOut);

        return () => {
          node.removeEventListener('pointerover', handleMouseOver);
          node.removeEventListener('pointerout', handleMouseOut);
        };
      }
    },
    [ref.current], // Recall only if ref changes
  );

  return value;
}
