import { MutableRefObject, useEffect } from "react";

export function useOnClickOutside(ref: MutableRefObject<any>, handler: any) {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("pointerdown", listener);

    return () => {
      document.removeEventListener("pointerdown", listener);
    };
  }, [ref, handler]);
}
