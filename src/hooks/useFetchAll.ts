export async function useFetchAll(lastPage: number, callback: any) {
  const fetchedItems = [];

  const source = {
    [Symbol.asyncIterator]() {
      return {
        fetchedPages: 1,
        lastPage,

        async next() {
          if (this.fetchedPages <= this.lastPage) {
            const response = await callback({
              page: this.fetchedPages
            });
            this.fetchedPages++;
            return { done: false, value: response }
          } else {
            return { done: true }
          }
        }
      }
    }
  }

  for await (let fetchedPage of source) {
    if (!fetchedPage) continue;
    fetchedItems.push(...fetchedPage.data.data);
  }

  return Array.from(new Set(fetchedItems));
}
