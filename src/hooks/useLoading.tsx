import { useState } from "react";

export function useLoading(initialList: string | string[] = []): [string[], (list: string | string[]) => void] {
  const [loadingList, setLoadingList] = useState<string[]>(
    typeof initialList === "string" ? [initialList] : initialList
  );

  function handleItem(item: string) {
    setLoadingList(_curr =>
      _curr.includes(item)
        ? _curr.filter(_item => _item !== item)
        : [..._curr, item]
    )
  }

  function toggleLoading(list: string | string[]) {
    if (typeof list === "string") {
      handleItem(list);
    } else {
      list.forEach((_item: string) => handleItem(_item))
    }
  }

  return ([loadingList, toggleLoading]);
}
